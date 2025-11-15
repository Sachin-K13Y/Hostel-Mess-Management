import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, role }) {
  const { user } = useSelector((state) => state.auth);

  return user?.role === role ? children : <Navigate to="/" replace />;
}
