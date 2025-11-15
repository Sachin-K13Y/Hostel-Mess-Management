import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSummary } from "../features/student/studentSlice";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io"; // Import an icon

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.student);
  const complaintState = useSelector((state) => state.complaint);
  const leaveState = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(getStudentSummary());
  }, [dispatch]);

  // A helper for card styles to avoid repetition
  const cardClasses =
    "transform cursor-pointer rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

  return (
    // We assume the navbar is 64px (h-16), so we calculate the min-height
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome, {user?.name}
      </h1>

      {loading && <p className="text-lg text-gray-600">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Complaints Card */}
        <div
          className={cardClasses}
          onClick={() => navigate("/student/complaints")}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Complaints
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Total:
              <span className="font-semibold text-gray-900 float-right">
                {complaintState.total || 0}
              </span>
            </p>
            <p className="text-gray-600">
              Pending:
              <span className="font-semibold text-red-500 float-right">
                {complaintState.pending || 0}
              </span>
            </p>
            <p className="text-gray-600">
              Resolved:
              <span className="font-semibold text-green-600 float-right">
                {complaintState.resolved || 0}
              </span>
            </p>
          </div>
        </div>

        {/* Leave Requests Card */}
        <div
          className={cardClasses}
          onClick={() => navigate("/student/leave")}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Leave Requests
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Total:
              <span className="font-semibold text-gray-900 float-right">
                {leaveState.total || 0}
              </span>
            </p>
            <p className="text-gray-600">
              Approved:
              <span className="font-semibold text-green-600 float-right">
                {leaveState.approved || 0}
              </span>
            </p>
            <p className="text-gray-600">
              Pending:
              <span className="font-semibold text-yellow-500 float-right">
                {leaveState.pending || 0}
              </span>
            </p>
          </div>
        </div>

        {/* Notifications Card - styled as a CTA */}
        <div
          className={`${cardClasses} flex flex-col justify-between`}
          onClick={() => navigate("/student/notifications")}
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Notifications
            </h3>
            <p className="text-gray-600 mt-2">Check all updates</p>
          </div>
          <div className="flex justify-end items-center mt-4">
            <IoIosArrowForward className="text-gray-500 text-2xl" />
          </div>
        </div>
        
      </div>
    </div>
  );
}