import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const getQuizzesForCourse = async (courseId: String) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/course/${courseId}`);
  return data;
};

export const createQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return data;
};

export const deleteQuiz = async (quizId: String) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};
export const getProfile = async () => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return data;
};

export const getQuizById = async (quizId: String) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return data;
}

export const getQuestionsForQuiz = async (quizId: String) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};

export const addQuestionToQuiz = async (quizId: String, question: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
  return data;
};

export const deleteQuestion = async (questionId: String) => {
  const { data } = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
  return data;
};

export const getFacultyResponses = async (quizId: String) => {
  const response = await axiosWithCredentials.get(`/api/quizzes/${quizId}/faculty-responses`);
  return response.data;
};

export const saveFacultyResponses = async (quizId: String, data: any) => {
  const response = await axiosWithCredentials.post(`/api/quizzes/${quizId}/faculty-responses`, data);
  return response.data;
};

export const saveStudentResponses = async (quizId: String, studentId: String, responses: any[], score: number, attemptNumber: any) => {
  const storedData = JSON.parse(localStorage.getItem("studentQuizResponses") || "[]");

  const updatedData = storedData.filter(
    (record: { quizId: String; studentId: String; }) => !(record.quizId === quizId && record.studentId === studentId)
  );

  updatedData.push({
    quizId,
    studentId,
    responses,
    score,
    attemptNumber,
    lastAttempted: new Date().toISOString(),
  });

  localStorage.setItem("studentQuizResponses", JSON.stringify(updatedData));
};

export const getStudentResponses = async (quizId: String, studentId:String) => {
  const storedData = JSON.parse(localStorage.getItem("studentQuizResponses") || "[]");
  return storedData.find((record: { quizId: String; studentId: String; }) => record.quizId === quizId && record.studentId === studentId);
};