// Helper: Status Badge
const ComplaintStatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium capitalize";
  let statusClasses = "";

  switch (status) {
    case "Resolved":
      statusClasses = "bg-green-100 text-green-800";
      break;
    case "In-Progress":
      statusClasses = "bg-blue-100 text-blue-800";
      break;
    default: // "Pending"
      statusClasses = "bg-yellow-100 text-yellow-800";
  }

  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

// Helper: Info Row
const InfoRow = ({ label, value })=> (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

// --- The Card Component ---
export default function WardenComplaintCard({ complaint, onUpdateStatus, loading }) {
  const { _id, category, description, user, roomNumber, status, createdAt } = complaint;

  // Base classes for action buttons
  const btnBase = "w-full rounded-md px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors disabled:bg-gray-400";
  const btnPending = "bg-yellow-500 hover:bg-yellow-600";
  const btnInProgress = "bg-blue-500 hover:bg-blue-600";
  const btnResolved = "bg-green-600 hover:bg-green-700";

  return (
    <div className="flex flex-col rounded-xl bg-white p-5 shadow-md">
      
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {category}
        </h3>
        <ComplaintStatusBadge status={status} />
      </div>

      {/* Complaint Details */}
      <div className="flex-grow space-y-2 mb-4">
        <p className="text-sm text-gray-700">{description}</p>
        <div className="border-t border-gray-100 pt-2 space-y-1">
          <InfoRow label="Student" value={user?.name} />
          <InfoRow label="Room" value={roomNumber} />
        </div>
        <span className="text-xs text-gray-500 float-right pt-1">
          Filed: {new Date(createdAt).toLocaleString()}
        </span>
      </div>
      
      {/* Warden Controls */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Update Status:
        </label>
        <div className="flex gap-2 justify-between">
          {status !== "Pending" && (
            <button
              className={`${btnBase} ${btnPending}`}
              onClick={() => onUpdateStatus(_id, "Pending")}
              disabled={loading}
            >
              Pending
            </button>
          )}
          {status !== "In-Progress" && (
            <button
              className={`${btnBase} ${btnInProgress}`}
              onClick={() => onUpdateStatus(_id, "In-Progress")}
              disabled={loading}
            >
              In-Progress
            </button>
          )}
          {status !== "Resolved" && (
            <button
              className={`${btnBase} ${btnResolved}`}
              onClick={() => onUpdateStatus(_id, "Resolved")}
              disabled={loading}
            >
              Resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );
}