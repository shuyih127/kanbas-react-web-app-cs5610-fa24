import { Link, Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Profile from "./Account/Profile";
import Signup from "./Account/Signup";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";

export default function Kanbas() {
    return (
      <div id="wd-kanbas">
        
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
        <Link to="/Labs">Landing Page</Link>
            <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Courses/:cid/*" element={<Courses />} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
        </div>
      </div>
  );}
  
