import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as quizClient from "./client";

export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: "afterSubmission",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
  });

  const [activeTab, setActiveTab] = useState<"Details" | "Questions">("Details");

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId) {
        const fetchedQuiz = await quizClient.getQuizById(quizId);
        setQuiz(fetchedQuiz);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleSave = async () => {
    await quizClient.updateQuiz(quiz);
    navigate(`../Quizzes/${quizId}`);
  };

  const handleSaveAndPublish = async () => {
    await quizClient.updateQuiz({ ...quiz, isPublished: true });
    navigate(`../Quizzes`);
  };

  const handleCancel = () => {
    navigate(`../Quizzes`);
  };

  const handleChange = (field: string, value: any) => {
    setQuiz((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mt-3">
      <div className="d-flex border-bottom mb-3">
        <button
          className={`btn ${activeTab === "Details" ? "btn-primary" : "btn-light"}`}
          onClick={() => setActiveTab("Details")}
        >
          Details
        </button>
        <button
          className={`btn ${activeTab === "Questions" ? "btn-primary" : "btn-light"}`}
          onClick={() => setActiveTab("Questions")}
        >
          Questions
        </button>
      </div>

      {activeTab === "Details" ? (
            <div>
            <div className="mb-3">
            <label className="form-label">Title</label>
            <input
                type="text"
                className="form-control"
                value={quiz.title}
                onChange={(e) => handleChange("title", e.target.value)}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
                className="form-control"
                rows={5}
                value={quiz.description}
                onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
            </div>

            <div className="mb-3">
            <label className="form-label">Quiz Type</label>
            <select
                className="form-select"
                value={quiz.quizType}
                onChange={(e) => handleChange("quizType", e.target.value)}
            >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Points</label>
            <input
                type="number"
                className="form-control"
                value={quiz.points}
                onChange={(e) => handleChange("points", parseInt(e.target.value))}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Assignment Group</label>
            <select
                className="form-select"
                value={quiz.assignmentGroup}
                onChange={(e) => handleChange("assignmentGroup", e.target.value)}
            >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Shuffle Answers</label>
            <select
                className="form-select"
                value={quiz.shuffleAnswers ? "Yes" : "No"}
                onChange={(e) => handleChange("shuffleAnswers", e.target.value === "Yes")}
            >
                <option>Yes</option>
                <option>No</option>
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Time Limit</label>
            <input
                type="number"
                className="form-control"
                value={quiz.timeLimit}
                onChange={(e) => handleChange("timeLimit", parseInt(e.target.value))}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Multiple Attempts</label>
            <select
                className="form-select"
                value={quiz.multipleAttempts ? "Yes" : "No"}
                onChange={(e) => handleChange("multipleAttempts", e.target.value === "Yes")}
            >
                <option>No</option>
                <option>Yes</option>
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Show Correct Answers</label>
            <select
                className="form-select"
                value={quiz.showCorrectAnswers}
                onChange={(e) => handleChange("showCorrectAnswers", e.target.value)}
            >
                <option>Immediately</option>
                <option>No answer</option>
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Access Code</label>
            <input
                type="text"
                className="form-control"
                value={quiz.accessCode}
                onChange={(e) => handleChange("accessCode", e.target.value)}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">One Question at a Time</label>
            <select
                className="form-select"
                value={quiz.oneQuestionAtATime ? "Yes" : "No"}
                onChange={(e) => handleChange("oneQuestionAtATime", e.target.value === "Yes")}
            >
                <option>Yes</option>
                <option>No</option>
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Webcam Required</label>
            <select
                className="form-select"
                value={quiz.webcamRequired ? "Yes" : "No"}
                onChange={(e) => handleChange("webcamRequired", e.target.value === "Yes")}
            >
                <option>No</option>
                <option>Yes</option>
            </select>
            </div>

            <div className="mb-3">
            <label className="form-label">Lock Questions After Answering</label>
            <select
                className="form-select"
                value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                onChange={(e) =>
                handleChange("lockQuestionsAfterAnswering", e.target.value === "Yes")
                }
            >
                <option>No</option>
                <option>Yes</option>
            </select>
            </div>

            <div className="row">
            <div className="col-md-4 mb-3">
                <label className="form-label">Due Date</label>
                <input
                type="datetime-local"
                className="form-control"
                value={quiz.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Available Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={quiz.availableDate}
                onChange={(e) => handleChange("availableDate", e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Until Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={quiz.untilDate}
                onChange={(e) => handleChange("untilDate", e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-secondary me-2" onClick={handleCancel}>
                Cancel
                </button>
                <button className="btn btn-danger me-2" onClick={handleSave}>
                Save
                </button>
                <button className="btn btn-primary" onClick={handleSaveAndPublish}>
                Save & Publish
                </button>
            </div>

          </div>
        </div>
      ) : (
        <div>
          <h3>Questions Editor</h3>
          
        </div>
      )}

    </div>
  );
}