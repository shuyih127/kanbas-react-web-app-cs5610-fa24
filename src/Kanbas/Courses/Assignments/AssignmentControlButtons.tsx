import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from 'react-icons/bs';

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <div className="badge rounded-pill bg-light text-muted me-3">
        40% of Total
      </div>
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}