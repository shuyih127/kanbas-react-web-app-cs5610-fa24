import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as quizClient from "./client";

export default function QuizPreview() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [lastAttempted, setLastAttempted] = useState<Date | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        if (quizId) {
          const profile = await quizClient.getProfile();
          setUserId(profile._id);

          const fetchedQuiz = await quizClient.getQuizById(quizId);
          const fetchedQuestions = await quizClient.getQuestionsForQuiz(quizId);

          setQuiz({ ...fetchedQuiz, questions: fetchedQuestions });

          // Fetch previous responses, score, and last attempted date
          const storedData = localStorage.getItem(`${profile._id}_${quizId}`);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setResponses(parsedData.responses || []);
            setLastScore(parsedData.score || null);
            setScore(parsedData.score || null);
            setLastAttempted(parsedData.lastAttempted ? new Date(parsedData.lastAttempted) : null);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuizAndQuestions();
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

  const handleSubmit = () => {
    if (!userId) {
      return;
    }

    const calculatedScore = calculateScore(quiz.questions, responses);
    setScore(calculatedScore);
    setLastScore(calculatedScore);

    // Save to local storage
    const dataToSave = {
      userId,
      quizId,
      responses,
      score: calculatedScore,
      lastAttempted: new Date(),
    };
    localStorage.setItem(`${userId}_${quizId}`, JSON.stringify(dataToSave));
    setLastAttempted(new Date());
  };

  const calculateScore = (questions: any[], responses: any[]) => {
    let totalScore = 0;
    questions.forEach((question) => {
      const response = responses.find((r) => r.questionId === question._id);
      if (response && question.correctAnswers.includes(response.answer)) {
        totalScore += question.points || 0;
      }
    });
    return totalScore;
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quiz) {
    return <div>No quiz found</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <div className="d-flex justify-content-between align-items-center">
        {!quizStarted && (
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/Kanbas/Courses/${quiz.courseId}/Quizzes/${quizId}/edit`)}
          >
            Edit Quiz
          </button>
        )}
        {!quizStarted && (
          <button className="btn btn-primary" onClick={startQuiz}>
            Start Quiz
          </button>
        )}
        {lastAttempted && (
          <p>
            Last Attempt: {lastAttempted.toLocaleDateString()} at {lastAttempted.toLocaleTimeString()} | Last Score: {lastScore || 0}
          </p>
        )}
      </div>
      <hr />
      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((question: any, index: number) => (
          <div key={question._id} className="mb-4">
            <h5>
              Question {index + 1}: {question.title} ({question.points} pts)
            </h5>
            <p>{question.questionText}</p>
            {question.type === "Multiple Choice" && (
              <div>
                {question.choices.map((choice: any, idx: number) => (
                  <div key={idx} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${question._id}`}
                      value={choice.text}
                      checked={responses.find((r) => r.questionId === question._id)?.answer === choice.text}
                      onChange={(e) => quizStarted && handleResponseChange(question._id, e.target.value)}
                      disabled={!quizStarted}
                    />
                    <label className="form-check-label">{choice.text}</label>
                  </div>
                ))}
              </div>
            )}
            {question.type === "True/False" && (
              <div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question-${question._id}`}
                    value="true"
                    checked={responses.find((r) => r.questionId === question._id)?.answer === "true"}
                    onChange={(e) => quizStarted && handleResponseChange(question._id, "true")}
                    disabled={!quizStarted}
                  />
                  <label className="form-check-label">True</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question-${question._id}`}
                    value="false"
                    checked={responses.find((r) => r.questionId === question._id)?.answer === "false"}
                    onChange={(e) => quizStarted && handleResponseChange(question._id, "false")}
                    disabled={!quizStarted}
                  />
                  <label className="form-check-label">False</label>
                </div>
              </div>
            )}
            {question.type === "Fill in the Blank" && (
              <input
                type="text"
                className="form-control"
                value={responses.find((r) => r.questionId === question._id)?.answer || ""}
                onChange={(e) => quizStarted && handleResponseChange(question._id, e.target.value)}
                disabled={!quizStarted}
              />
            )}
          </div>
        ))
      ) : (
        <p>No questions.</p>
      )}
      {quizStarted && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Quiz
          </button>
          {score !== null && <p>Your Score: {score}</p>}
        </div>
      )}
    </div>
  );
}
