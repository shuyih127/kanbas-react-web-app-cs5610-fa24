import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { enrollInCourse, unenrollFromCourse, fetchEnrollmentsForUser } from "./client";

type EnrollmentState = {
  enrolledCourses: string[];
};

const saveEnrollmentsToLocalStorage = (enrollments: string[]) => {
  localStorage.setItem("enrolledCourses", JSON.stringify(enrollments));
};

const loadEnrollmentsFromLocalStorage = (): string[] => {
  const savedEnrollments = localStorage.getItem("enrolledCourses");
  return savedEnrollments ? JSON.parse(savedEnrollments) : [];
};

const initialState: EnrollmentState = {
  enrolledCourses: loadEnrollmentsFromLocalStorage(),
};

export const fetchEnrollments = createAsyncThunk(
  "enrollments/fetchEnrollments",
  async (userId: string) => {
    const enrollments = await fetchEnrollmentsForUser(userId);
    return enrollments.map((e: { course: string }) => e.course);
  }
);

export const enrollAsync = createAsyncThunk(
  "enrollments/enroll",
  async ({ userId, courseId }: { userId: string; courseId: string }) => {
    await enrollInCourse(userId, courseId);
    return courseId;
  }
);

export const unenrollAsync = createAsyncThunk(
  "enrollments/unenroll",
  async ({ userId, courseId }: { userId: string; courseId: string }) => {
    await unenrollFromCourse(userId, courseId);
    return courseId;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.enrolledCourses = action.payload;
        saveEnrollmentsToLocalStorage(state.enrolledCourses);
      })
      .addCase(enrollAsync.fulfilled, (state, action) => {
        if (!state.enrolledCourses.includes(action.payload)) {
          state.enrolledCourses.push(action.payload);
          saveEnrollmentsToLocalStorage(state.enrolledCourses);
        }
      })
      .addCase(unenrollAsync.fulfilled, (state, action) => {
        state.enrolledCourses = state.enrolledCourses.filter(
          (courseId) => courseId !== action.payload
        );
        saveEnrollmentsToLocalStorage(state.enrolledCourses);
      });
  },
});

export const selectIsEnrolled = (state: any, courseId: string) => {
  return state.enrollmentsReducer.enrolledCourses.includes(courseId);
};

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;