import { useState } from "react";

// --- UI HELPER: Status Badge ---
const StatusBadge = ({ status }) => {
  const getStyle = () => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700 border-green-200";
      case "Rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStyle()}`}>
      <span className={`h-2 w-2 rounded-full ${status === "Approved" ? "bg-green-500" : status === "Rejected" ? "bg-red-500" : "bg-yellow-500"}`}></span>
      {status}
    </span>
  );
};

// --- COMPONENT ---
export default function WardenLeaveCard({ leave, onUpdateStatus, loading }) {
  const [comment, setComment] = useState(leave.wardenComment || "");
  const [actionLoading, setActionLoading] = useState(null);

  const handleAction = async (newStatus) => {
    setActionLoading(newStatus);
    await onUpdateStatus(leave._id, newStatus, comment);
    setActionLoading(null);
  };

  // Date formatting helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      full: date.toLocaleDateString()
    };
  };

  const from = formatDate(leave.fromDate);
  const to = formatDate(leave.toDate);

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-100">
      
      {/* --- HEADER --- */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold text-lg">
            {leave.user?.name?.charAt(0) || "S"}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 leading-tight">{leave.user?.name}</h3>
            <span className="text-xs text-gray-400">Applied: {new Date(leave.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <StatusBadge status={leave.status} />
      </div>

      {/* --- BODY: TIMELINE --- */}
      <div className="mb-4 rounded-lg bg-gray-50 p-3 border border-gray-100">
        <div className="flex items-center justify-between text-center">
          
          {/* FROM */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase text-gray-400">From</span>
            <span className="text-lg font-bold text-gray-800">{from.day}</span>
            <span className="text-xs font-medium text-gray-500">{from.month}</span>
          </div>

          {/* ARROW */}
          <div className="flex-1 px-4 flex flex-col items-center">
             <span className="text-xs text-gray-400 mb-1">Duration</span>
             <div className="h-px w-full bg-gray-300 relative">
               <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45"></div>
             </div>
          </div>

          {/* TO */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase text-gray-400">To</span>
            <span className="text-lg font-bold text-gray-800">{to.day}</span>
            <span className="text-xs font-medium text-gray-500">{to.month}</span>
          </div>
        </div>
      </div>

      {/* REASON */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase text-gray-400 mb-1">Reason</p>
        <p className="text-sm text-gray-700 leading-relaxed italic">
          "{leave.reason}"
        </p>
      </div>

      {/* --- FOOTER: ACTIONS --- */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        
        {/* Comment Input */}
        <div className="mb-4">
          <label htmlFor={`comment-${leave._id}`} className="block text-xs font-bold text-gray-500 mb-1">
            Warden Comment (Optional)
          </label>
          <input
            id={`comment-${leave._id}`}
            type="text"
            placeholder="Add note..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading || leave.status !== "Pending"}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          
          {/* Reject Button */}
          {leave.status !== "Rejected" && (
            <button
              onClick={() => handleAction("Rejected")}
              disabled={loading}
              className="flex-1 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 hover:border-red-200 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading && actionLoading === "Rejected" ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                "Reject"
              )}
            </button>
          )}

          {/* Approve Button */}
          {leave.status !== "Approved" && (
            <button
              onClick={() => handleAction("Approved")}
              disabled={loading}
              className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-green-700 hover:shadow-md disabled:bg-green-300 flex justify-center items-center gap-2"
            >
               {loading && actionLoading === "Approved" ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                "Approve"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}