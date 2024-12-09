import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as quizClient from "./client";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";

export default function QuizQuestionsEditor() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<any | null>(null);
  const [quizPoints, setQuizPoints] = useState<number>(0);
  const [showQuestionTypeDropdown, setShowQuestionTypeDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (quizId) {
        const fetchedQuestions = await quizClient.getQuestionsForQuiz(quizId);
        setQuestions(fetchedQuestions);
        calculateTotalPoints(fetchedQuestions);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const calculateTotalPoints = (questions: any[]) => {
    const total = questions.reduce((sum, q) => sum + (q.points || 0), 0);
    setQuizPoints(total);
  };

  const handleAddQuestion = (type: string) => {
    setActiveQuestion({
      quizId,
      type,
      title: "",
      points: 1,
      questionText: "",
      choices: [],
    });
    setShowQuestionTypeDropdown(false);
  };

  const handleSaveQuestion = async (question: any) => {
    if (!quizId) {
      return;
    }
    if (question._id) {
      await quizClient.updateQuestion(question);
      setQuestions(
        questions.map((q) => (q._id === question._id ? question : q))
      );
    } else {
      const savedQuestion = await quizClient.addQuestionToQuiz(quizId, question);
      setQuestions([...questions, savedQuestion]);
    }
    calculateTotalPoints([...questions, question]);
    setActiveQuestion(null);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await quizClient.deleteQuestion(questionId);
    setQuestions(questions.filter((q) => q._id !== questionId));
    calculateTotalPoints(questions.filter((q) => q._id !== questionId));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Questions</h3>
        <h5>Points: {quizPoints}</h5>
      </div>
      <div className="border-bottom mb-3">
        <div className="position-relative">
          <button
            className="btn btn-primary"
            onClick={() => setShowQuestionTypeDropdown(!showQuestionTypeDropdown)}
          >
            + New Question
          </button>
          {showQuestionTypeDropdown && (
            <div
              className="dropdown-menu d-block"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <button
                className="dropdown-item"
                onClick={() => handleAddQuestion("Multiple Choice")}
              >
                Multiple Choice
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleAddQuestion("True/False")}
              >
                True/False
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleAddQuestion("Fill in the Blank")}
              >
                Fill in the Blank
              </button>
            </div>
          )}
        </div>
      </div>
      {activeQuestion ? (
        renderQuestionEditor(activeQuestion, handleSaveQuestion, () => setActiveQuestion(null))
      ) : (
        <ul className="list-group">
          {questions.map((question) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={question._id}>
              <span>
                <strong>{question.type}:</strong> {question.title}
              </span>
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setActiveQuestion(question)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteQuestion(question._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function renderQuestionEditor(question: any, onSave: any, onCancel: any) {
  switch (question.type) {
    case "Multiple Choice":
      return (
        <MultipleChoiceEditor
          question={question}
          onSave={onSave}
          onCancel={onCancel}
        />
      );
    case "True/False":
      return (
        <TrueFalseEditor
          question={question}
          onSave={onSave}
          onCancel={onCancel}
        />
      );
    case "Fill in the Blank":
      return (
        <FillInTheBlankEditor
          question={question}
          onSave={onSave}
          onCancel={onCancel}
        />
      );
    default:
      return null;
  }
}