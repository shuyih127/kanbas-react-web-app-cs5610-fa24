import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
      addAssignment: (state, { payload: assignment }) => {
        const newAssignment = {
          ...assignment,
          _id: new Date().getTime().toString(),
        };
        state.assignments.push(newAssignment);
      },
      deleteAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== assignmentId
        );
      },
      updateAssignment: (state, { payload: assignment }) => {
        state.assignments = state.assignments.map((a) =>
          a._id === assignment._id ? assignment : a
        );
      },
      editAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.map((a) =>
          a._id === assignmentId ? { ...a, editing: true } : a
        );
      },
    },
  });
  
  export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
  export default assignmentsSlice.reducer;