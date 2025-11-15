import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

// Import the icons
import {
  MdOutlineDashboard,
  MdOutlineMarkunreadMailbox,
  MdOutlineLogout,
  MdOutlineEventNote,
} from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { unreadCount } = useSelector((state) => state.notification);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // --- Tailwind Class Helpers ---

  // Base classes for the navigation links in the center
  const navLinkBase =
    "flex items-center gap-2 text-gray-600 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200";
  // Classes to add when the link is hovered
  const navLinkHover = "hover:text-gray-900 hover:bg-gray-100";
  // Classes to add when the link is active
  const navLinkActive = "bg-blue-50 text-blue-600 font-semibold";

  // Function to dynamically set NavLink classes
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? `${navLinkBase} ${navLinkActive}`
      : `${navLinkBase} ${navLinkHover}`;

  // Base classes for the icon buttons on the right
  const iconButtonBase =
    "flex items-center justify-center w-10 h-10 rounded-full text-gray-600 transition-colors duration-200";
  // Classes for icon button hover
  const iconButtonHover = "hover:text-gray-900 hover:bg-gray-100";

  // --- Component JSX ---

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white px-8 shadow-sm">
      
      {/* LEFT — LOGO */}
      <div
        className="cursor-pointer text-2xl font-bold text-gray-800"
        onClick={() => navigate("/student/dashboard")}
      >
        HostelMS
      </div>

      {/* CENTER — NAVIGATION LINKS */}
      <div className="flex items-center gap-3">
        <NavLink to="/student/dashboard" className={getNavLinkClass}>
          <MdOutlineDashboard className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/student/complaints" className={getNavLinkClass}>
          <MdOutlineMarkunreadMailbox className="text-xl" />
          <span>Complaints</span>
        </NavLink>

        <NavLink to="/student/leave" className={getNavLinkClass}>
          <MdOutlineEventNote className="text-xl" />
          <span>Leaves</span>
        </NavLink>
      </div>

      {/* RIGHT — USER & ACTIONS */}
      <div className="flex items-center gap-4">
        <NavLink
          to="/student/notifications"
          className={`${iconButtonBase} ${iconButtonHover} relative`}
          title="Notifications"
        >
          <IoMdNotificationsOutline className="text-2xl" />
          {unreadCount > 0 && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={`${iconButtonBase} ${iconButtonHover}`}
          title="Profile"
        >
          <CgProfile className="text-2xl" />
        </NavLink>

        <button
          onClick={handleLogout}
          className={`${iconButtonBase} text-red-600 hover:bg-red-50 hover:text-red-700`}
          title="Logout"
        >
          <MdOutlineLogout className="text-2xl" />
        </button>
      </div>
    </nav>
  );
}