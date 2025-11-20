import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWardenSummary,
  fetchWardenRecent,
} from "../features/warden/wardenSlice";
import { useNavigate } from "react-router-dom";

export default function WardenDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { summary, recent, loading } = useSelector((state) => state.warden);

  useEffect(() => {
    dispatch(fetchWardenSummary());
    dispatch(fetchWardenRecent());
  }, [dispatch]);

  // --- Loading Spinner ---
  if (loading || !summary || !recent) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  // Helper for Status Colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "approved":
      case "resolved": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      case "in progress": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, here's what's happening in the hostel.</p>
      </header>

      {/* --- STATS CARDS ROW --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* 1. Complaints Card */}
        <div 
          onClick={() => navigate("/warden/complaints")}
          className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-700">📢 Complaints</h3>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 group-hover:bg-blue-100">
              View All
            </span>
          </div>
          
          <div className="text-4xl font-extrabold text-slate-800 mb-4">
            {summary.complaints.total}
            <span className="text-sm font-normal text-slate-400 ml-2">Total</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-600">
            <div className="rounded bg-yellow-50 py-2 border border-yellow-100">
              <span className="block text-yellow-700 font-bold text-lg">{summary.complaints.pending}</span>
              Pending
            </div>
            <div className="rounded bg-blue-50 py-2 border border-blue-100">
              <span className="block text-blue-700 font-bold text-lg">{summary.complaints.inProgress}</span>
              Active
            </div>
            <div className="rounded bg-green-50 py-2 border border-green-100">
              <span className="block text-green-700 font-bold text-lg">{summary.complaints.resolved}</span>
              Fixed
            </div>
          </div>
        </div>

        {/* 2. Leaves Card */}
        <div 
          onClick={() => navigate("/warden/leaves")}
          className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-700">📄 Leave Requests</h3>
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600 group-hover:bg-purple-100">
              Manage
            </span>
          </div>

          <div className="text-4xl font-extrabold text-slate-800 mb-4">
            {summary.leaves.total}
            <span className="text-sm font-normal text-slate-400 ml-2">Total</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-600">
            <div className="rounded bg-yellow-50 py-2 border border-yellow-100">
              <span className="block text-yellow-700 font-bold text-lg">{summary.leaves.pending}</span>
              Pending
            </div>
            <div className="rounded bg-green-50 py-2 border border-green-100">
              <span className="block text-green-700 font-bold text-lg">{summary.leaves.approved}</span>
              Approved
            </div>
            <div className="rounded bg-red-50 py-2 border border-red-100">
              <span className="block text-red-700 font-bold text-lg">{summary.leaves.rejected}</span>
              Rejected
            </div>
          </div>
        </div>

        {/* 3. Broadcast Card (Action) */}
        <div 
          onClick={() => navigate("/warden/broadcast")}
          className="group cursor-pointer rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-center items-center text-center"
        >
          <div className="mb-3 rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Make Announcement</h3>
          <p className="mt-2 text-blue-100 text-sm">Send important notifications to all hostel students instantly.</p>
          <button className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm transition-colors hover:bg-blue-50">
            Compose Broadcast
          </button>
        </div>
      </div>

      {/* --- RECENT ACTIVITY ROW --- */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        {/* Recent Complaints Panel */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="mb-5 text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>⚡</span> Recent Complaints
          </h3>
          
          <div className="space-y-4">
            {recent.recentComplaints.length === 0 ? (
              <p className="text-center py-8 text-gray-400 italic">No recent activity.</p>
            ) : (
              recent.recentComplaints.map((c) => (
                <div key={c._id} className="flex items-start justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-800">{c.category}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold border uppercase ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Leaves Panel */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="mb-5 text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>🗓️</span> Recent Leave Requests
          </h3>
          
          <div className="space-y-4">
            {recent.recentLeaves.length === 0 ? (
              <p className="text-center py-8 text-gray-400 italic">No recent activity.</p>
            ) : (
              recent.recentLeaves.map((l) => (
                <div key={l._id} className="flex items-start justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-800 truncate max-w-[200px]">{l.reason}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(l.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold border uppercase ${getStatusColor(l.status)}`}>
                    {l.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}