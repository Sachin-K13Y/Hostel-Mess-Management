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

  // --- Style Helper for Nav Links ---
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200 shadow-sm" // Active State
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"    // Inactive State
    }`;

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur-md shadow-sm md:px-8">
      
      {/* LEFT — LOGO */}
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => navigate("/student/dashboard")}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-md">
          H
        </div>
        <span className="hidden text-xl font-bold tracking-tight text-slate-800 sm:block">
          HostelMS
        </span>
      </div>

      {/* CENTER — NAVIGATION LINKS */}
      {/* On mobile, we hide the text and just show icons to save space */}
      <div className="flex items-center gap-1 md:gap-2">
        <NavLink to="/student/dashboard" className={getNavLinkClass}>
          <MdOutlineDashboard className="text-xl" />
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>

        <NavLink to="/student/complaints" className={getNavLinkClass}>
          <MdOutlineMarkunreadMailbox className="text-xl" />
          <span className="hidden sm:inline">Complaints</span>
        </NavLink>

        <NavLink to="/student/leave" className={getNavLinkClass}>
          <MdOutlineEventNote className="text-xl" />
          <span className="hidden sm:inline">Leaves</span>
        </NavLink>
      </div>

      {/* RIGHT — USER & ACTIONS */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Notifications */}
        <NavLink
          to="/student/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          title="Notifications"
        >
          <IoMdNotificationsOutline className="text-2xl" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount}
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            </span>
          )}
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          title="Profile"
        >
          <CgProfile className="text-2xl" />
        </NavLink>

        {/* Logout */}
        <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block"></div>

        <button
          onClick={handleLogout}
          className="flex h-10 w-10 items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
          title="Logout"
        >
          <MdOutlineLogout className="text-2xl" />
        </button>
      </div>
    </nav>
  );
}