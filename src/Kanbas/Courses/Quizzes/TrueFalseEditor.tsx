import React, { useState } from "react";

export default function TrueFalseEditor({ question, onSave, onCancel }: any) {
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const handleChange = (field: string, value: any) => {
    setCurrentQuestion((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h4>Edit True/False Question</h4>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={currentQuestion.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Points</label>
        <input
          type="number"
          className="form-control"
          value={currentQuestion.points}
          onChange={(e) => handleChange("points", parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Question</label>
        <textarea
          className="form-control"
          rows={3}
          value={currentQuestion.questionText}
          onChange={(e) => handleChange("questionText", e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Answer</label>
        <div>
          <label className="me-3">
            <input
              type="radio"
              name="answer"
              value="true"
              checked={currentQuestion.correctAnswer === "true"}
              onChange={() => handleChange("correctAnswer", "true")}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="answer"
              value="false"
              checked={currentQuestion.correctAnswer === "false"}
              onChange={() => handleChange("correctAnswer", "false")}
            />
            False
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={() => onSave(currentQuestion)}>
          Save Question
        </button>
      </div>
    </div>
  );
}