import { FaPlus } from "react-icons/fa6";
import { FaSearch } from 'react-icons/fa';

export default function AssignmentControls() {
    return (
        <div id="wd-assignment-controls" className="d-flex justify-content-between align-items-center">
            <div className="input-group" style={{ width: '300px' }}>
                <span className="input-group-text bg-white">
                    <FaSearch />
                </span>
                <input id="wd-search-assignment"
                       className="form-control"
                       placeholder="Search for Assignments" />
            </div>

            <div className="d-flex ms-auto">
                <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-2">
                    <FaPlus className="me-1" /> Group
                </button>
                <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end">
                    <FaPlus className="me-1" /> Assignment
                </button>
            </div>
        </div>
    );
}