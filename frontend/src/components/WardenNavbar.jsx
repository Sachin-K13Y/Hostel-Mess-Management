import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function WardenNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current URL

  const { unreadCount } = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // If not a warden, hide navbar
  if (!user || user.role !== "warden") return null;

  // --- Reusable Nav Item Helper ---
  const NavLink = ({ to, label, badge }) => {
    // Check if this link is the active page
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`relative whitespace-nowrap rounded-md px-3 py-2 text-[15px] font-medium transition-all duration-200 
          ${
            isActive
              ? "bg-blue-600 text-white shadow-md" // Active Style
              : "text-gray-300 hover:bg-gray-700/50 hover:text-white" // Inactive Style
          }`}
      >
        {label}
        {/* Notification Badge Logic */}
        {badge > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-[#1b263b]">
            {badge}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          </span>
        )}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 flex h-[64px] w-full items-center justify-between bg-[#1b263b]/95 px-6 text-white shadow-lg backdrop-blur-sm">
      
      {/* LEFT — LOGO */}
      <div
        className="flex cursor-pointer items-center gap-2 text-xl font-bold tracking-wide text-gray-100 transition-opacity hover:opacity-80"
        onClick={() => navigate("/warden/dashboard")}
      >
        <span className="text-2xl">🛡️</span>
        <span className="hidden sm:block">Warden Panel</span>
      </div>

      {/* CENTER — SCROLLABLE LINKS */}
      {/* 'scrollbar-hide' class or inline style is used to hide the scrollbar for cleaner look */}
      <div className="no-scrollbar mx-4 flex flex-1 items-center gap-2 overflow-x-auto px-2">
        
        <NavLink to="/warden/dashboard" label="Dashboard" />

        {/* ⭐ AI & IOT FEATURES ⭐ */}
        <NavLink to="/warden/iot-headcount" label="IoT Headcount" />
        <NavLink to="/warden/ml-prediction" label="ML Prediction" />
        {/* ----------------------- */}

        <NavLink to="/warden/complaints" label="Complaints" />
        <NavLink to="/warden/leaves" label="Leaves" />
        <NavLink to="/warden/broadcast" label="Broadcast" />
        
        <NavLink to="/notifications" label="Notifications" badge={unreadCount} />
        
        <NavLink to="/profile" label="Profile" />
      </div>

      {/* RIGHT — LOGOUT */}
      <button
        onClick={handleLogout}
        className="whitespace-nowrap rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 border border-red-500/30 transition-all hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95"
      >
        Logout
      </button>
      
      {/* Inline style to hide scrollbar cross-browser */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}