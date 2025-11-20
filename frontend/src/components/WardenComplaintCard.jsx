import { useState } from "react";

// --- UI HELPER: Status Badge ---
const StatusBadge = ({ status }) => {
  const getStyle = () => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-700 border-green-200";
      case "In-Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStyle()}`}>
      <span className={`h-2 w-2 rounded-full ${status === "Resolved" ? "bg-green-500" : status === "In-Progress" ? "bg-blue-500" : "bg-yellow-500"}`}></span>
      {status}
    </span>
  );
};

// --- COMPONENT ---
export default function WardenComplaintCard({ complaint, onUpdateStatus, loading }) {
  const { _id, category, description, user, roomNumber, status, createdAt } = complaint;
  
  // Local state to track which specific button triggered the loading
  const [actionLoading, setActionLoading] = useState(null);

  const handleAction = async (newStatus) => {
    setActionLoading(newStatus);
    await onUpdateStatus(_id, newStatus);
    setActionLoading(null); // Reset after parent finishes (though component might unmount/rerender)
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-100">
      
      {/* --- HEADER --- */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Category Icon Placeholder based on Category text could go here, using generic for now */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 leading-tight">{category}</h3>
            <span className="text-xs text-gray-400">ID: {_id.slice(-6).toUpperCase()}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* --- BODY --- */}
      <div className="mb-6 flex-grow">
        <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700 leading-relaxed">
          "{description}"
        </div>

        {/* Meta Details Grid */}
        <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-gray-700">{user?.name || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Room: <span className="font-medium text-gray-700">{roomNumber}</span></span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 border-t border-dashed border-gray-100 pt-2 mt-1">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{new Date(createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* --- ACTIONS --- */}
      <div className="border-t border-gray-100 pt-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Update Status</p>
        <div className="flex gap-2">
          
          {/* Show "Pending" Button only if currently NOT Pending */}
          {status !== "Pending" && (
            <button
              onClick={() => handleAction("Pending")}
              disabled={loading}
              className="flex-1 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs font-bold text-yellow-700 hover:bg-yellow-100 disabled:opacity-50"
            >
              {loading && actionLoading === "Pending" ? "..." : "Reset Pending"}
            </button>
          )}

          {/* Show "In-Progress" Button only if currently NOT In-Progress */}
          {status !== "In-Progress" && (
            <button
              onClick={() => handleAction("In-Progress")}
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 hover:shadow-md disabled:bg-blue-300 flex items-center justify-center gap-1"
            >
              {loading && actionLoading === "In-Progress" ? (
                 <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                 <>Start Work</>
              )}
            </button>
          )}

          {/* Show "Resolved" Button only if currently NOT Resolved */}
          {status !== "Resolved" && (
            <button
              onClick={() => handleAction("Resolved")}
              disabled={loading}
              className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-green-700 hover:shadow-md disabled:bg-green-300 flex items-center justify-center gap-1"
            >
               {loading && actionLoading === "Resolved" ? (
                 <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                 <>Mark Done</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}