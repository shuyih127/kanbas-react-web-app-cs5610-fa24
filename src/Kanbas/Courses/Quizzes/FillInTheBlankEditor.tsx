import React, { useState } from "react";

export default function FillInTheBlankEditor({ question, onSave, onCancel }: any) {
  const [currentQuestion, setCurrentQuestion] = useState({
    ...question,
    answers: question.answers || [], 
  });

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...currentQuestion.answers];
    newAnswers[index] = value;
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  };

  const handleAddAnswer = () => {
    setCurrentQuestion({
      ...currentQuestion,
      answers: [...(currentQuestion.answers || []), ""],
    });
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = currentQuestion.answers.filter((_: any, i: number) => i !== index);
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  };

  const handleChange = (field: string, value: any) => {
    setCurrentQuestion((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h4>Edit Fill in the Blank Question</h4>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={currentQuestion.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Points</label>
        <input
          type="number"
          className="form-control"
          value={currentQuestion.points || 0}
          onChange={(e) => handleChange("points", parseInt(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Question</label>
        <textarea
          className="form-control"
          rows={3}
          value={currentQuestion.questionText || ""}
          onChange={(e) => handleChange("questionText", e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Possible Answers</label>
        {(currentQuestion.answers || []).map((answer: string, index: number) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveAnswer(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-secondary mt-2" onClick={handleAddAnswer}>
          Add Answer
        </button>
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
