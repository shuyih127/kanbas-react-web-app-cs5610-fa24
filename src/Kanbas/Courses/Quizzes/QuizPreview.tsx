import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as quizClient from "./client";

export default function QuizPreview() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [lastAttempted, setLastAttempted] = useState<Date | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizAndUser = async () => {
      if (quizId) {
        try {
          const profile = await quizClient.getProfile();
          setUserId(profile._id);

          const fetchedQuiz = await quizClient.getQuizById(quizId);
          setQuiz(fetchedQuiz);

          const fetchedResponses = await quizClient.getFacultyResponses(quizId);
          if (fetchedResponses) {
            setResponses(fetchedResponses.responses);
            setScore(fetchedResponses.score);
            setLastAttempted(new Date(fetchedResponses.lastAttempted));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchQuizAndUser();
  }, [quizId]);

  const handleResponseChange = (questionId: string, answer: string) => {
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.map((response) =>
        response.questionId === questionId ? { ...response, answer } : response
      );

      if (!updatedResponses.find((response) => response.questionId === questionId)) {
        updatedResponses.push({ questionId, answer });
      }

      return updatedResponses;
    });
  };

  const handleSubmit = async () => {
    if (!userId) {
      return;
    }

    const calculatedScore = calculateScore(quiz.questions, responses);
    setScore(calculatedScore);
    await quizClient.saveFacultyResponses(quizId!, {
        userId,
        responses,
        score: calculatedScore,
    });
  };

  const calculateScore = (questions: any[], responses: any[]) => {
    let score = 0;
    questions.forEach((question) => {
      const response = responses.find((r) => r.questionId === question._id);
      if (response && response.answer === question.correctAnswer) {
        score += question.points;
      }
    });
    return score;
  };

  if (!quiz) {
    return <div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-secondary" onClick={() => navigate(`../edit`)}>
          Edit Quiz
        </button>
        {lastAttempted && <p>Last Attempt: {lastAttempted.toLocaleString()}</p>}
      </div>
      <hr />
      {quiz.questions.map((question: any) => (
        <div key={question._id} className="mb-4">
          <h5>{question.title}</h5>
          <p>{question.questionText}</p>
          {question.type === "Multiple Choice" && (
            <div>
              {question.choices.map((choice: any, index: number) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={choice.text}
                    checked={responses.find((r) => r.questionId === question._id)?.answer === choice.text}
                    onChange={(e) => handleResponseChange(question._id, e.target.value)}
                  />
                  <label>{choice.text}</label>
                </div>
              ))}
            </div>
          )}
          {question.type === "True/False" && (
            <div>
              <input
                type="radio"
                name={`question-${question._id}`}
                value="true"
                checked={responses.find((r) => r.questionId === question._id)?.answer === "true"}
                onChange={(e) => handleResponseChange(question._id, "true")}
              />
              <label>True</label>
              <br />
              <input
                type="radio"
                name={`question-${question._id}`}
                value="false"
                checked={responses.find((r) => r.questionId === question._id)?.answer === "false"}
                onChange={(e) => handleResponseChange(question._id, "false")}
              />
              <label>False</label>
            </div>
          )}
          {question.type === "Fill in the Blank" && (
            <input
              type="text"
              className="form-control"
              value={responses.find((r) => r.questionId === question._id)?.answer || ""}
              onChange={(e) => handleResponseChange(question._id, e.target.value)}
            />
          )}
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
