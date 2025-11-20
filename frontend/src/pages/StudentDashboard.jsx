import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSummary } from "../features/student/studentSlice";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.student);
  const complaintState = useSelector((state) => state.complaint);
  const leaveState = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(getStudentSummary());
  }, [dispatch]);

  // Date helper
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 md:p-10">
      
      {/* --- HEADER --- */}
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Hello, {user?.name?.split(" ")[0] || "Student"} 👋
          </h1>
          <p className="mt-1 text-slate-500">Here is your daily summary.</p>
        </div>
        <div className="text-sm font-medium text-slate-400 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          📅 {today}
        </div>
      </header>

      {/* --- CARDS GRID --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* 1. COMPLAINTS CARD */}
        <div
          onClick={() => navigate("/student/complaints")}
          className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
          {/* Decorative Background Icon */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-50 opacity-50 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Issues</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-1">Complaints</h3>
          <p className="text-sm text-slate-500 mb-6">Track your reported issues</p>

          <div className="grid grid-cols-3 gap-2 border-t pt-4">
            <div className="text-center">
              <span className="block text-lg font-bold text-slate-800">{complaintState.total || 0}</span>
              <span className="text-[10px] uppercase text-slate-400">Total</span>
            </div>
            <div className="text-center border-l border-gray-100">
              <span className="block text-lg font-bold text-orange-500">{complaintState.pending || 0}</span>
              <span className="text-[10px] uppercase text-slate-400">Pending</span>
            </div>
            <div className="text-center border-l border-gray-100">
              <span className="block text-lg font-bold text-green-500">{complaintState.resolved || 0}</span>
              <span className="text-[10px] uppercase text-slate-400">Fixed</span>
            </div>
          </div>
        </div>

        {/* 2. LEAVE REQUESTS CARD */}
        <div
          onClick={() => navigate("/student/leave")}
          className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
          {/* Decorative Background Icon */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 opacity-50 transition-transform group-hover:scale-110"></div>

          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Passes</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-1">Leave Requests</h3>
          <p className="text-sm text-slate-500 mb-6">Manage gate passes & holidays</p>

          <div className="grid grid-cols-3 gap-2 border-t pt-4">
            <div className="text-center">
              <span className="block text-lg font-bold text-slate-800">{leaveState.total || 0}</span>
              <span className="text-[10px] uppercase text-slate-400">Total</span>
            </div>
            <div className="text-center border-l border-gray-100">
              <span className="block text-lg font-bold text-blue-500">{leaveState.pending || 0}</span>
              <span className="text-[10px] uppercase text-slate-400">Pending</span>
            </div>
            <div className="text-center border-l border-gray-100">
              <span className="block text-lg font-bold text-green-500">{leaveState.approved || 0}</span>
              <span className="text-[10px] uppercase text-slate-400">Approved</span>
            </div>
          </div>
        </div>

        {/* 3. NOTIFICATIONS CARD */}
        <div
          onClick={() => navigate("/student/notifications")}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div>
            <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3 backdrop-blur-sm">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">Notifications</h3>
            <p className="mt-1 text-indigo-100 opacity-90">Stay updated with hostel announcements.</p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-100 group-hover:text-white">
            <span>View Inbox</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}