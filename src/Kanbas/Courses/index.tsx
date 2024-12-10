import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
// import PeopleTable from "./People/Table";
import PeopleForCourse from "./People/PeopleForCourse"
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import StartQuiz from "./Quizzes/QuizStart";


export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid); 
    const { pathname } = useLocation(); 
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
                </h2> <hr />
            <div className="d-flex">
            <div className="d-none d-md-block">
                <CoursesNavigation />
            </div>
            <div className="flex-fill">
            <Routes>
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid?" element={<AssignmentEditor />} />
                <Route path="People" element={<PeopleForCourse />} />
                <Route path="Quizzes" element={<Quizzes />} />
                <Route path="Quizzes/:quizId" element={<QuizDetails />} />
                <Route path="Quizzes/:quizId/edit" element={<QuizEditor />} />
                <Route path="Quizzes/:quizId/preview" element={<QuizPreview />} />
                <Route path="Quizzes/:quizId/start" element={<StartQuiz />} />
            </Routes>
            </div></div>
        </div>
  );}
  