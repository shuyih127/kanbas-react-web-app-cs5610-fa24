import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EnrollmentState = {
  enrolledCourses: string[]; 
};

const loadEnrollmentsFromLocalStorage = (): string[] => {
    const savedEnrollments = localStorage.getItem("enrolledCourses");
    return savedEnrollments ? JSON.parse(savedEnrollments) : [];
};

const saveEnrollmentsToLocalStorage = (enrollments: string[]) => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrollments));
};
  
const initialState: EnrollmentState = {
  enrolledCourses: loadEnrollmentsFromLocalStorage(),
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<string>) => {
      if (!state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload);
        saveEnrollmentsToLocalStorage(state.enrolledCourses);
      }
    },
    unenroll: (state, action: PayloadAction<string>) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (courseId) => courseId !== action.payload
      );
      saveEnrollmentsToLocalStorage(state.enrolledCourses);
    },
  },
});

export const selectIsEnrolled = (state: any, courseId: string) => {
    return state.enrollmentsReducer.enrolledCourses.includes(courseId);
};
  
export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;