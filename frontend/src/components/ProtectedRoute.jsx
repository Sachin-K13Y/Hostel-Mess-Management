import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Show a loading spinner while Auth state is being determined
  // (Prevents kicking the user to Login page for a split second on refresh)
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  // 2. If no token, redirect to Login
  if (!token) {
    // 'state={{ from: location }}' allows you to redirect them back 
    // to the intended page after a successful login.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. Render the protected page
  return children;
}