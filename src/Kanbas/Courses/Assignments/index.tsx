import { BsGripVertical} from 'react-icons/bs';
import { FaCaretDown, FaTrash } from 'react-icons/fa'; //
import AssignmentControls from './AssignmentControls';
import AssignmentControlButtons from './AssignmentControlButtons';
import AssignmentButtons from './AssignmentButtons';
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect } from 'react';
import { setAssignments,
         addAssignment,
         deleteAssignment,
         updateAssignment,
         editAssignment } from "./reducer";
import * as assignmentClient from "./client"


export default function Assignments() {
    const { cid } = useParams(); 
    const dispatch = useDispatch();
    const assignments = useSelector((state: any) =>
      (state.assignmentsReducer?.assignments || []).filter(
        (assignment: { course: string | undefined }) => assignment.course === cid
      )
    );
  
    const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
      null
    );
  
    useEffect(() => {
      const fetchAssignments = async () => {
        if (cid) {
          const assignments = await assignmentClient.getAssignments();
          dispatch(setAssignments(assignments));
        }
      };
      fetchAssignments();
    }, [cid, dispatch]);
  
    const handleCreateAssignment = async (newAssignment: any) => {
      if (cid) {
        const assignment = { ...newAssignment, course: cid };
        const createdAssignment = await assignmentClient.createAssignment(assignment);
        dispatch(addAssignment(createdAssignment));
      }
    };
  
    const handleUpdateAssignment = async (updatedAssignment: any) => {
      const result = await assignmentClient.updateAssignment(updatedAssignment);
      dispatch(updateAssignment(result));
    };
  
    const confirmDelete = (assignmentId: string) => {
      setAssignmentToDelete(assignmentId);
    };
  
    const handleDeleteConfirm = async () => {
      if (assignmentToDelete) {
        await assignmentClient.deleteAssignment(assignmentToDelete);
        dispatch(deleteAssignment(assignmentToDelete));
        setAssignmentToDelete(null);
      }
    };
  
    const handleDeleteCancel = () => {
      setAssignmentToDelete(null);
    };
  
    return (
      <div className="container mt-3">
        <AssignmentControls/>
        <br />
        <br />
        <br />
        <br />
  
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="ms-1" /> ASSIGNMENTS
              <AssignmentControlButtons />
            </div>
            <ul className="wd-lessons list-group rounded-0">
              {assignments.map((assignment: any) => (
                <li
                  key={assignment._id}
                  className="wd-lesson list-group-item p-3 ps-1"
                >
                  <div className="d-flex">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-4" />
                      <MdOutlineAssignment className="fs-4" />
                    </div>
                    <div className="flex-grow-1 mx-3">
                      <div className="fw-bold">
                        <Link
                          to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                          className="text-dark text-decoration-none"
                        >
                          {assignment.title}
                        </Link>
                      </div>
                      <div className="text-muted">
                        <span className="text-danger">{assignment.modules}</span> |{" "}
                        <strong> Not available until</strong>{" "}
                        {assignment.availableFrom}
                      </div>
                      <div className="text-muted">
                        <strong>Due </strong>
                        {assignment.dueDate} | {assignment.points} pts
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <AssignmentButtons
                        assignmentId={assignment._id}
                        deleteAssignment={confirmDelete}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        {assignmentToDelete && (
          <div className="modal fade show" style={{ display: "block" }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Assignment</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleDeleteCancel}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this assignment?</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={handleDeleteCancel}
                  >
                    NO
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteConfirm}
                  >
                    YES
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );}