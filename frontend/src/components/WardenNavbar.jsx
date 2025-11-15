import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function WardenNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { unreadCount } = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // If not a warden, hide navbar
  if (!user || user.role !== "warden") return null;

  return (
    <nav style={styles.nav}>
      {/* LEFT — LOGO */}
      <div style={styles.logo} onClick={() => navigate("/warden/dashboard")}>
        Warden Panel
      </div>

      {/* CENTER — LINKS */}
      <div style={styles.links}>
        <Link to="/warden/dashboard" style={styles.link}>
          Dashboard
        </Link>

        <Link to="/warden/complaints" style={styles.link}>
          Complaints
        </Link>

        <Link to="/warden/leaves" style={styles.link}>
          Leave Requests
        </Link>

        <Link to="/warden/broadcast" style={styles.link}>
          Broadcast
        </Link>

        <Link to="/notifications" style={styles.link}>
          Notifications{" "}
          {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
        </Link>

        <Link to="/profile" style={styles.link}>
          Profile
        </Link>
      </div>

      {/* RIGHT — LOGOUT */}
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    height: "60px",
    background: "#1b263b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#f8f9fa",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#e0e0e0",
    textDecoration: "none",
    fontSize: "16px",
  },
  badge: {
    background: "red",
    color: "white",
    padding: "2px 6px",
    borderRadius: "50%",
    fontSize: "12px",
    marginLeft: "5px",
  },
  logoutBtn: {
    background: "#e63946",
    color: "white",
    padding: "7px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
