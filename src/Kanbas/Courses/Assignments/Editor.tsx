import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
        (assignment) => assignment.course === cid && assignment._id === aid
  );
  if (!assignment) {
    return <div>Assignment not found.</div>;
  }
  return (
    <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input id="wd-name" className="form-control" value={assignment.title} />
            </div>

            <div className="mb-3">
                <textarea id="wd-description" className="form-control" value={assignment.description}/>
            </div>

            <div className="mb-3 col-md-4 d-flex align-items-center">
                <label htmlFor="wd-points" className="form-label me-2">Points</label>
                <input id="wd-points" className="form-control flex-grow-1" value={assignment.points}/>
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
              <div className="card"
                          style={{ width: "19rem" }}>

                <div className="mb-2 p-2 d-flex col-md-6">
                  <select id="wd-submission-type" className="form-select">
                    <option value="online">Online</option>
                  </select>
                </div>

                <div className="mb-2 p-2 col-md-6">
                  <label className="form-label mt-2"  style={{ whiteSpace: 'nowrap' }}>Online Entry Options</label>
                    <div className="form-check">
                      <input type="checkbox" id="wd-text-entry" className="form-check-input" /> 
                      <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked /> 
                      <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" id="wd-media-recordings" className="form-check-input" /> 
                      <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" id="wd-student-annotation" className="form-check-input" /> 
                      <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" id="wd-file-upload" className="form-check-input" /> 
                      <label className="form-check-label" htmlFor="wd-file-upload">File Upload</label>
                    </div>
                </div>
              </div>
            </div>

            <div className="mb-3 d-flex">
                <label htmlFor="wd-assign-to" className="form-label me-2">Assign</label>
                <div className="card" style={{ width: "30rem" }}>
                    <div className="mb-2">
                        <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                        <input id="wd-assign-to" className="form-control" value="Everyone"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="wd-due-date" className="form-label mb-2">Due</label>
                        <input id="wd-due-date" type="text" className="form-control mb-2" value={assignment.dueDate} />
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="wd-available-from" className="form-label mb-2">Available from</label>
                            <input id="wd-available-from" type="text" className="form-control mb-2" value={assignment.availableFrom} />
                        </div>
                        <div className="col">
                            <label htmlFor="wd-available-until" className="form-label mb-2">Until</label>
                            <input id="wd-available-until" type="datetime-local" className="form-control mb-2" value={assignment.dueDate} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-secondary me-2">Cancel</button>
              <button className="btn btn-danger">Save</button>
            </div>
          </div>
);
}