import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses"  className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/1234/Home">
              <img src="/images/CoursePic2.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS1234 React JS
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/5100/Home">
              <img src="/images/CoursePic2.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    CS5100 
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    Foundations Artificial Intelligence 
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/5170/Home">
              <img src="/images/CoursePic2.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    CS5170 
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    AI for Human Comp Interaction 
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/5180/Home">
              <img src="/images/CoursePic.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    CS5180 
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    Renfrcmnt Lrning/Seq Decsn Mkg
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/6140/Home">
              <img src="/images/CoursePic.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    CS6140
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    Machine Learning
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                  to="/Kanbas/Courses/5010/Home">
              <img src="/images/CoursePic.jpg" width="100%" height={160}/>
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    DS5010
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    Python
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          </div>
        </div>
    </div></div>
  );
}

