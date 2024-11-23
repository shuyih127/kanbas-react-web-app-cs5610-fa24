import axios from "axios";

const ASSIGNMENTS_API = `${process.env.REACT_APP_REMOTE_SERVER}/api/assignments`;
export const createAssignment = async (assignment: any) => {
    const { data } = await axios.post(ASSIGNMENTS_API, assignment);
    return data;
};

export const getAssignments = async () => {
    const { data } = await axios.get(ASSIGNMENTS_API);
    return data;
};

export const getAssignmentById = async (assignmentId: string) => {
    const { data } = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
    return data;
};

export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const { data } = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return data;
};