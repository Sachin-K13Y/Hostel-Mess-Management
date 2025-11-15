import { useState } from "react";

// Helper: Status Badge (re-used from other components)
const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium capitalize";
  let statusClasses = "";

  switch (status) {
    case "Approved":
      statusClasses = "bg-green-100 text-green-800";
      break;
    case "Rejected":
      statusClasses = "bg-red-100 text-red-800";
      break;
    default: // Pending
      statusClasses = "bg-yellow-100 text-yellow-800";
  }

  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

// Helper: Info Row
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

// --- The Card Component ---
export default function WardenLeaveCard({ leave, onUpdateStatus, loading }) {
  // This card manages its own comment state, pre-filled if it exists
  const [comment, setComment] = useState(leave.wardenComment || "");

  const handleApprove = () => {
    onUpdateStatus(leave._id, "Approved", comment);
  };

  const handleReject = () => {
    onUpdateStatus(leave._id, "Rejected", comment);
  };

  return (
    <div className="flex flex-col rounded-xl bg-white p-5 shadow-md">
      
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {leave.user?.name}
        </h3>
        <StatusBadge status={leave.status} />
      </div>

      {/* Leave Details */}
      <div className="space-y-2 mb-4">
        <InfoRow label="From" value={leave.fromDate.substring(0, 10)} />
        <InfoRow label="To" value={leave.toDate.substring(0, 10)} />
        <p className="text-sm text-gray-800 pt-2">
          <span className="font-medium text-gray-900">Reason: </span>
          {leave.reason}
        </p>
        <span className="text-xs text-gray-500 float-right pt-1">
          Applied: {new Date(leave.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Spacer to push controls to the bottom */}
      <div className="flex-grow" />

      {/* Warden Controls */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <label htmlFor={`comment-${leave._id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Warden Comment
        </label>
        <textarea
          id={`comment-${leave._id}`}
          placeholder="Add a comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          disabled={loading}
        />
        
        {/* Action Buttons */}
        <div className="flex gap-3 mt-3">
          {leave.status !== "Approved" && (
            <button
              className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:bg-gray-400"
              onClick={handleApprove}
              disabled={loading}
            >
              Approve
            </button>
          )}
          {leave.status !== "Rejected" && (
            <button
              className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 disabled:bg-gray-400"
              onClick={handleReject}
              disabled={loading}
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
}