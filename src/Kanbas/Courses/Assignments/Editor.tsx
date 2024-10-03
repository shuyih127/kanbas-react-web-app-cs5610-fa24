export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor" className="container mt-4">
      
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" value="A1" />
      </div>

      <div className="mb-3">
        <input id="wd-description" className="form-control"
          value="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify..." />
      </div>

      <div className="mb-3 col-md-4 d-flex align-items-center">
        <label htmlFor="wd-points" className="form-label me-2">Points</label>
        <input id="wd-points" className="form-control flex-grow-1" value={100} />
      </div>
        
      <div className="mb-3 col-md-4 d-flex align-items-center">
        <label htmlFor="wd-group" className="form-label me-2" style={{ whiteSpace: 'nowrap' }}>Assignment Group</label>
        <select id="wd-group" className="form-select flex-grow-1">
          <option value="assignments">ASSIGNMENTS</option>
        </select>
      </div>

      <div className="mb-3 col-md-4 d-flex align-items-center">
        <label htmlFor="wd-display-grade-as" className="form-label me-2" style={{ whiteSpace: 'nowrap' }}>Display Grade as</label>
        <select id="wd-display-grade-as" className="form-select flex-grow-1">
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
        <div className="card"
                    style={{ width: "30rem" }}>

          <div className="mb-2">
            <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
            <input id="wd-assign-to" className="form-control" value="Everyone" />
          </div>
          <div className="mb-2">
            <label htmlFor="wd-due-date" className="form-label mb-2">Due</label>
            <input id="wd-due-date" type="datetime-local" className="form-control mb-2" value="2024-05-13T23:59" />
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="wd-available-from" className="form-label mb-2">Available from</label>
              <input id="wd-available-from" type="datetime-local" className="form-control mb-2" value="2024-05-06T12:00" />
            </div>
            <div className="col">
              <label htmlFor="wd-available-until" className="form-label mb-2">Until</label>
              <input id="wd-available-until" type="datetime-local" className="form-control mb-2" value="2024-05-06T13:00"/>
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
  