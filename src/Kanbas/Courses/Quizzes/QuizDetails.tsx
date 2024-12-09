import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as quizClient from "./client";
import * as userClient from "./client";

export default function QuizDetails() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuiz = await quizClient.getQuizById(quizId!);
      setQuiz(fetchedQuiz);

      const profile = await userClient.getProfile();
      setRole(profile.role);
    };
    fetchData();
  }, [quizId]);

  if (!quiz) {
    return <div></div>;
  }

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-end mb-3">
        {role === "ADMIN" || role === "TA" ? (
          <>
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate(`./preview`)}
            >
              Preview
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`./edit`)}
            >
              Edit
            </button>
          </>
        ) : (
          <button className="btn btn-primary">
            Start Quiz
          </button>
        )}
      </div>
      <h1 className="mb-4">{quiz.title}</h1>  
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Quiz Type</th>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <th scope="row">Points</th>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <th scope="row">Assignment Group</th>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <th scope="row">Shuffle Answers</th>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th scope="row">Time Limit</th>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <th scope="row">Multiple Attempts</th>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <th scope="row">How Many Attempts</th>
              <td>{quiz.maxAttempts}</td>
            </tr>
          )}
          <tr>
            <th scope="row">Show Correct Answers</th>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <th scope="row">Access Code</th>
            <td>{quiz.accessCode || " "}</td>
          </tr>
          <tr>
            <th scope="row">One Question at a Time</th>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th scope="row">Webcam Required</th>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th scope="row">Lock Questions After Answering</th>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "Not Set"}</td>
            <td>Everyone</td>
            <td>{quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "Not Set"}</td>
            <td>{quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "Not Set"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
