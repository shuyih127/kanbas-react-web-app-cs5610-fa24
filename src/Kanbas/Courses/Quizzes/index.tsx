import React, { useEffect, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch, FaPlus, FaRocket, FaCheckCircle } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCaretDown } from 'react-icons/fa';
import * as quizClient from "./client";
import * as userClient from "./client";

export default function Quizzes() {
  const { cid } = useParams(); 
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cid) {
        const fetchedQuizzes = await quizClient.getQuizzesForCourse(cid);
        const filteredQuizzes =
          role === "ADMIN" || role === "TA" ? fetchedQuizzes : fetchedQuizzes.filter((quiz: { isPublished: any; }) => quiz.isPublished);
        setQuizzes(filteredQuizzes);
        const profile = await userClient.getProfile();
        setRole(profile.role);
      }
    };
    fetchData();
  }, [cid, role]);

  const handleAddQuiz = async () => {
    if (cid && (role === "ADMIN" || role === "TA")) {
      const newQuiz = await quizClient.createQuiz({
        title: "New Quiz",
        course: cid,
        isPublished: false,
        availableDate: null,
        dueDate: null,
        points: 0,
        questions: [],
      });
      navigate(`./${newQuiz._id}`);
    }
  };

  const togglePublish = async (quiz: any) => {
    if (role === "ADMIN" || role === "TA") {
      const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
      await quizClient.updateQuiz(updatedQuiz);
      setQuizzes(
        quizzes.map((q) => (q._id === quiz._id ? { ...q, isPublished: updatedQuiz.isPublished } : q))
      );
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (role === "ADMIN" || role === "TA") {
      await quizClient.deleteQuiz(quizId);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="input-group" style={{ width: "300px" }}>
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input
            id="wd-search-quiz"
            className="form-control"
            placeholder="Search for Quiz"
          />
        </div>

        {role === "ADMIN" || role === "TA" ? (
          <button className="btn btn-lg btn-danger" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Quiz
          </button>
        ) : null}
      </div>

      <ul id="wd-quizzes" className="list-group rounded-0 mt-4">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">  
            <FaCaretDown className="ms-1" /> Assignment Quizzes
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {quizzes.map((quiz) => (
              <li
                key={quiz._id}
                className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center"
              >
                <div className="d-flex align-items-center me-3">
                  <FaRocket className="text-success fs-5 me-3" />
                </div>

                <div className="flex-grow-1">
                  <Link
                    to={`./${quiz._id}`}
                    className="text-dark text-decoration-none fw-bold"
                  >
                    {quiz.title}
                  </Link>
                  <div className="text-muted mt-1">
                    <strong>
                      {quiz.availableDate && new Date() < new Date(quiz.availableDate)
                        ? `Not available until ${new Date(quiz.availableDate).toLocaleString()}`
                        : new Date() > new Date(quiz.dueDate)
                        ? "Closed"
                        : "Available"}
                    </strong>
                    {quiz.dueDate && ` | Due: ${new Date(quiz.dueDate).toLocaleString()}`}
                    {` | ${quiz.points} pts | ${quiz.questions.length} Questions`}
                  </div>
                </div>

                <div>
                    {role === "ADMIN" || role === "TA" ? (
                        <span
                        onClick={() => togglePublish(quiz)}
                        style={{ cursor: "pointer" }}
                        >
                        {quiz.isPublished ? (
                            <FaCheckCircle className="text-success fs-5" />
                        ) : (
                            <AiFillStop className="text-danger fs-5" />
                        )}
                        </span>
                    ) : quiz.isPublished ? (
                        <FaCheckCircle className="text-success fs-5" />
                    ) : (
                        <AiFillStop className="text-danger fs-5" />
                    )}
                </div>
                
                {(role === "ADMIN" || role === "TA") && (
                  <div className="float-end">
                    <IoEllipsisVertical
                      className="fs-4"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            navigate(`./${quiz._id}/edit`)
                          }
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => togglePublish(quiz)}
                        >
                          {quiz.isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDeleteQuiz(quiz._id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}