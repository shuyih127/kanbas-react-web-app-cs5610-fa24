import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { useState, useEffect } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNewAssignment = aid === "new";

  const assignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((assignment: { _id: string | undefined; }) => assignment._id === aid)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [submissionType, setSubmissionType] = useState("online");
  const [onlineEntryOptions, setOnlineEntryOptions] = useState({
    textEntry: false,
    websiteUrl: true,
    mediaRecordings: false,
    studentAnnotation: false,
    fileUpload: false,
  });

  useEffect(() => {
    if (!isNewAssignment && assignment) {
      setTitle(assignment.title || "");
      setDescription(assignment.description || "");
      setPoints(assignment.points || "");
      setDueDate(assignment.dueDate || "");
      setAvailableFrom(assignment.availableFrom || "");
      setAvailableUntil(assignment.availableUntil || "");
      setSubmissionType(assignment.submissionType || "online");
      setOnlineEntryOptions(assignment.onlineEntryOptions || {
        textEntry: false,
        websiteUrl: true,
        mediaRecordings: false,
        studentAnnotation: false,
        fileUpload: false,
      });
    }
  }, [isNewAssignment, assignment]);

  const handleSave = () => {
    const updatedAssignment = {
      _id: isNewAssignment ? new Date().getTime().toString() : assignment._id,
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      submissionType,
      onlineEntryOptions,
      course: cid,
    };

    if (isNewAssignment) {
      dispatch(addAssignment(updatedAssignment));
    } else {
      dispatch(updateAssignment(updatedAssignment));
    }

    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <textarea
          id="wd-description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3 col-md-4 d-flex align-items-center">
        <label htmlFor="wd-points" className="form-label me-2">Points</label>
        <input
          id="wd-points"
          className="form-control flex-grow-1"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      </div>

      <div className="mb-3 col-md-4 d-flex align-items-center">
        <label htmlFor="wd-group" className="form-label me-2" style={{ whiteSpace: 'nowrap' }}>Assignment Group</label>
        <select id="wd-group" className="form-select flex-grow-1" defaultValue="assignments" disabled>
          <option value="assignments">ASSIGNMENTS</option>
        </select>
      </div>

      <div className="mb-3 col-md-4 d-flex align-items-center">
        <label htmlFor="wd-display-grade-as" className="form-label me-2" style={{ whiteSpace: 'nowrap' }}>Display Grade as</label>
        <select id="wd-display-grade-as" className="form-select flex-grow-1" defaultValue="percentage" disabled>
          <option value="percentage">Percentage</option>
        </select>
      </div>

      <div className="mb-3 d-flex">
        <label htmlFor="wd-submission-type" className="form-label me-2">Submission Type</label>
        <div className="card" style={{ width: "19rem" }}>
          <div className="mb-2 p-2 d-flex col-md-6">
            <select
              id="wd-submission-type"
              className="form-select"
              value={submissionType}
              onChange={(e) => setSubmissionType(e.target.value)}
            >
              <option value="online">Online</option>
            </select>
          </div>

          <div className="mb-2 p-2 col-md-6">
            <label className="form-label mt-2" style={{ whiteSpace: 'nowrap' }}>Online Entry Options</label>
            <div className="form-check">
              <input
                type="checkbox"
                id="wd-text-entry"
                className="form-check-input"
                checked={onlineEntryOptions.textEntry}
                onChange={(e) => setOnlineEntryOptions({ ...onlineEntryOptions, textEntry: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 d-flex">
        <label htmlFor="wd-assign-to" className="form-label me-2">Assign</label>
        <div className="card" style={{ width: "30rem" }}>
          <div className="mb-2">
            <label htmlFor="wd-due-date" className="form-label mb-2">Due</label>
            <input
              id="wd-due-date"
              type="date"
              className="form-control mb-2"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="wd-available-from" className="form-label mb-2">Available from</label>
              <input
                id="wd-available-from"
                type="date"
                className="form-control mb-2"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="wd-available-until" className="form-label mb-2">Until</label>
              <input
                id="wd-available-until"
                type="datetime-local"
                className="form-control mb-2"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button onClick={handleCancel} className="btn btn-secondary me-2">Cancel</button>
        <button onClick={handleSave} className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}