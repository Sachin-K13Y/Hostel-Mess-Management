import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import Complaints from "./pages/Complaints";
import Leave from "./pages/Leave";
import Notifications from "./pages/Notifications";

import WardenDashboard from "./pages/WardenDashboard";
import WardenComplaints from "./pages/WardenComplaints";
import WardenLeaves from "./pages/WardenLeaves";
import WardenBroadcast from "./pages/WardenBroadcast";
import IotHeadcount from "./pages/IotHeadcount";
import MessPrediction from "./pages/MessPrediction"; // ⭐ NEW ML PAGE

import Navbar from "./components/Navbar";
import WardenNavbar from "./components/WardenNavbar";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  const { user } = useSelector((state) => state.auth);

  // Hide navbar on login/register pages
  const hideNavbar =
    window.location.pathname === "/" ||
    window.location.pathname === "/register";

  return (
    <BrowserRouter>
      
      {/* Navbar: Student / Warden Switch */}
      {!hideNavbar && (
        user?.role === "warden" ? <WardenNavbar /> : <Navbar />
      )}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ------------------------------------------
            STUDENT ROUTES
        ------------------------------------------- */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="student">
                <StudentDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/complaints"
          element={
            <ProtectedRoute>
              <RoleRoute role="student">
                <Complaints />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/leave"
          element={
            <ProtectedRoute>
              <RoleRoute role="student">
                <Leave />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute>
              <RoleRoute role="student">
                <Notifications />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* ------------------------------------------
            WARDEN ROUTES
        ------------------------------------------- */}
        <Route
          path="/warden/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="warden">
                <WardenDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/warden/complaints"
          element={
            <ProtectedRoute>
              <RoleRoute role="warden">
                <WardenComplaints />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/warden/leaves"
          element={
            <ProtectedRoute>
              <RoleRoute role="warden">
                <WardenLeaves />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/warden/broadcast"
          element={
            <ProtectedRoute>
              <RoleRoute role="warden">
                <WardenBroadcast />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* IoT HEADCOUNT */}
        <Route
          path="/warden/iot-headcount"
          element={
            <ProtectedRoute>
              <RoleRoute role="warden">
                <IotHeadcount />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ⭐ ML PREDICTION PAGE */}
        <Route
          path="/warden/ml-prediction"
          element={
            <ProtectedRoute>
              <RoleRoute role="warden">
                <MessPrediction />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
