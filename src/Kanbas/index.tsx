import { Link, Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Profile from "./Account/Profile";
import Signup from "./Account/Signup";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";

export default function Kanbas() {
    return (
      <div id="wd-kanbas">
        <Link to="/Labs">Landing Page</Link>
        <h1>Kanbas</h1> 
        <table>
            <tr>
            <td valign="top">
                <KanbasNavigation />
            </td>
            <td valign="top">
                <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Courses/:cid/*" element={<Courses />} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
                </td>
            </tr>
        </table>
      </div>
  );}
  
