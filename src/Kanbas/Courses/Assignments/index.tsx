import { BsGripVertical} from 'react-icons/bs';
import { FaCaretDown } from 'react-icons/fa'; //
import AssignmentControls from './AssignmentControls';
import AssignmentControlButtons from './AssignmentControlButtons';
import AssignmentButtons from './AssignmentButtons';
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from 'react-router-dom';

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments.filter(assignment => assignment.course === cid);
    return (
        <div className="container mt-3">
            < AssignmentControls /><br /><br /><br /><br />

          <ul id="wd-modules" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="ms-1" /> ASSIGNMENTS 
              <AssignmentControlButtons />
              </div>
              <ul className="wd-lessons list-group rounded-0">
                        {assignments.map(assignment => (
                            <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1">
                                <div className="d-flex">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-4" />
                                        <MdOutlineAssignment className="fs-4" />
                                    </div>
                                    <div className="flex-grow-1 mx-3">
                                        <div className="fw-bold">
                                            <Link 
                                                to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} 
                                                className="text-dark text-decoration-none">
                                                {assignment.title}
                                            </Link>
                                        </div>
                                        <div className="text-muted">
                                            <span className="text-danger">{assignment.modules}</span> | 
                                            <strong> Not available until</strong> {assignment.availableFrom}
                                        </div>
                                        <div className="text-muted">
                                            <strong>Due </strong>{assignment.dueDate} | {assignment.points} pts
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <AssignmentButtons />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}