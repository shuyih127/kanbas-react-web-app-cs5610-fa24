export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <br />
        <br />
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>

        <br />
        <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignments">ASSIGNMENTS</option>
              </select>
            </td>
        </tr>

        <br />
        <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
              </select>
            </td>
        </tr>

        <br />
        <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="online">Online</option>
              </select>
            </td>
        </tr>

        <br />
        <tr>
            <br />
            <td>
              <label>Online Entry Options</label> 
            </td>
        </tr>
        <tr>    
            <br />
            <td>
              <input type="checkbox" id="wd-text-entry" /> Text Entry<br />
              <input type="checkbox" id="wd-website-url" /> Website URL<br />
              <input type="checkbox" id="wd-media-recordings" /> Media Recordings<br />
              <input type="checkbox" id="wd-student-annotation" /> Student Annotation<br />
              <input type="checkbox" id="wd-file-upload" /> File Upload<br />
            </td>
        </tr>
          
        <br />
        <tr>
            <br />
            <td>
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
          </tr>
          <tr>
            <br />
            <td>
              <input id="wd-assign-to" value="Everyone" />
            </td>
        </tr>
          
        <br />
        <tr>
            <br />
            <td>
              <label htmlFor="wd-due-date">Due</label>
            </td>
        </tr>
        <tr>
            <br />
            <td>
              <input id="wd-due-date" type="date" value="2024-05-13" />
            </td>
        </tr>

        <br />
        <tr>
            <br />
            <td>
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <br />
            <td>
              <label htmlFor="wd-available-until">Until</label> 
            </td>
        </tr>

        <tr>
            <br />
            <td>
              <input id="wd-available-from" type="date" value="2024-05-06" />
            </td> 
            <br />
            <td>
              <input id="wd-available-until" type="date" value="2024-05-20" />
            </td>
        </tr>
        </table>

        <br />
        <button>Cancel</button> <button>Save</button>
        
    </div>
);}
  