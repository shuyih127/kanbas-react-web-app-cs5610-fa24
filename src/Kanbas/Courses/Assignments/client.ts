import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${process.env.REACT_APP_REMOTE_SERVER}/api/assignments`;

export const createAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.post(ASSIGNMENTS_API, assignment);
    return data;
  };
  
  export const getAssignments = async () => {
    const { data } = await axiosWithCredentials.get(ASSIGNMENTS_API);
    return data;
  };
  
  export const getAssignmentsForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(
      `${process.env.REACT_APP_REMOTE_SERVER}/api/courses/${courseId}/assignments`
    );
    return data;
  };
  
  export const getAssignmentById = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${assignmentId}`);
    return data;
  };
  
  export const updateAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
  };
  
  export const deleteAssignment = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return data;
  };