import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, role }) {
  const { user, loading } = useSelector((state) => state.auth);

  // 1. Wait for Auth to initialize
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  // 2. Security Check
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. Role Mismatch Handling
  if (user.role !== role) {
    // Instead of logging them out, send them to their appropriate home
    const correctDashboard =
      user.role === "warden" ? "/warden/dashboard" : "/student/dashboard";
      
    return <Navigate to={correctDashboard} replace />;
  }

  // 4. Access Granted
  return children;
}