import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.includes("Signin") && (
        <Link
          to="/Kanbas/Account/Signin"
          className={`list-group-item border-0 ${pathname === "/Kanbas/Account/Signin" ? "active" : ""}`}
        >
          Signin
        </Link>
      )}
      {links.includes("Signup") && (
        <Link
          to="/Kanbas/Account/Signup"
          className={`list-group-item border-0 ${pathname === "/Kanbas/Account/Signup" ? "text-danger" : ""}`}
        >
          Signup
        </Link>
      )}
      {links.includes("Profile") && (
        <Link
          to="/Kanbas/Account/Profile"
          className={`list-group-item border-0 ${pathname === "/Kanbas/Account/Profile" ? "text-danger" : ""}`}
        >
          Profile
        </Link>
      )}
    </div>
  );}
