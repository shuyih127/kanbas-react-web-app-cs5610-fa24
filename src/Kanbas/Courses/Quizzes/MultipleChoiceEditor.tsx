import React, { useState } from "react";

export default function MultipleChoiceEditor({ question, onSave, onCancel }: any) {
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const handleChoiceChange = (index: number, value: any) => {
    const newChoices = [...currentQuestion.choices];
    newChoices[index] = value;
    setCurrentQuestion({ ...currentQuestion, choices: newChoices });
  };

  const handleAddChoice = () => {
    setCurrentQuestion({
      ...currentQuestion,
      choices: [...currentQuestion.choices, { text: "", isCorrect: false }],
    });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = currentQuestion.choices.filter((_: any, i: number) => i !== index);
    setCurrentQuestion({ ...currentQuestion, choices: newChoices });
  };

  const handleChange = (field: string, value: any) => {
    setCurrentQuestion((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h4>Edit Multiple Choice Question</h4>
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
        <label className="form-label">Choices</label>
        {currentQuestion.choices.map((choice: any, index: number) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={choice.text}
              onChange={(e) =>
                handleChoiceChange(index, { ...choice, text: e.target.value })
              }
            />
            <input
              type="radio"
              name="correctChoice"
              checked={choice.isCorrect}
              onChange={() =>
                handleChoiceChange(index, { ...choice, isCorrect: true })
              }
            />
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleRemoveChoice(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-secondary mt-2" onClick={handleAddChoice}>
          Add Choice
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
