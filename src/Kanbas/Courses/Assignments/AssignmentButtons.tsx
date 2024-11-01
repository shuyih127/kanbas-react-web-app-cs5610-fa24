import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import React from "react";

export default function AssignmentButtons({assignmentId,
  deleteAssignment}:{
    assignmentId: string;
    deleteAssignment: (assignmentId: string) => void;
  }) {
  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2" onClick={() => deleteAssignment(assignmentId)} />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}