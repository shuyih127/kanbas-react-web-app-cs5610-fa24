import { BsGripVertical} from 'react-icons/bs';
import { FaCaretDown } from 'react-icons/fa'; //
import AssignmentControls from './AssignmentControls';
import AssignmentControlButtons from './AssignmentControlButtons';
import AssignmentButtons from './AssignmentButtons';
import { MdOutlineAssignment } from "react-icons/md";

export default function Assignments() {
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
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <div className="d-flex">
                      <div className="d-flex align-items-center">
                          <BsGripVertical className="me-2 fs-4" />
                          <MdOutlineAssignment className="fs-4" />
                      </div>
                      <div className="flex-grow-1 mx-3">
                          <div className="fw-bold">
                              <a href={`#/Kanbas/Courses/1234/Assignments/A1`} 
                                className="text-dark text-decoration-none">
                                  A1
                              </a>
                          </div>
                          <div className="text-muted">
                              <span className="text-danger">Multiple Modules</span> | 
                              <strong> Not available until</strong> May 6 at 12:00am
                          </div>
                          <div className="text-muted">
                              <strong>Due </strong>May 13 at 11:59pm | 100 pts
                          </div>
                      </div>
                      <div className="d-flex align-items-center">
                            <AssignmentButtons />
                      </div>
                  </div>
                </li>
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-4" />
                            <MdOutlineAssignment className="fs-4" />
                        </div>
                        <div className="flex-grow-1 mx-3">
                            <div className="fw-bold">
                              <a href={`#/Kanbas/Courses/1234/Assignments/A1`} 
                                className="text-dark text-decoration-none">
                                  A2
                              </a>
                            </div>
                            <div className="text-muted">
                                <span className="text-danger">Multiple Modules</span> | 
                                <strong> Not available until</strong> May 13 at 12:00am
                            </div>
                            <div className="text-muted">
                                <strong>Due </strong>May 20 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                              <AssignmentButtons />
                        </div>
                    </div>
                  </li>
                  <li className="wd-lesson list-group-item p-3 ps-1">
                  <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-4" />
                            <MdOutlineAssignment className="fs-4" />
                        </div>
                        <div className="flex-grow-1 mx-3">
                            <div className="fw-bold">
                              <a href={`#/Kanbas/Courses/1234/Assignments/A1`} 
                                className="text-dark text-decoration-none">
                                  A3
                              </a>
                            </div>
                            <div className="text-muted">
                                <span className="text-danger">Multiple Modules</span> | 
                                <strong> Not available until</strong> May 20 at 12:00am
                            </div>
                            <div className="text-muted">
                                <strong>Due </strong>May 27 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                              <AssignmentButtons />
                        </div>
                    </div>
                  </li>
              </ul>
            </li>
          </ul>
        </div>
    );
}