import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyLeave, fetchMyLeaves } from "../features/leave/leaveSlice";

// Helper component for styling the status badge
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

export default function Leave() {
  const dispatch = useDispatch();
  const { leaves, loading } = useSelector((state) => state.leave);

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchMyLeaves());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(applyLeave(form));
    setForm({ fromDate: "", toDate: "", reason: "" });
  };

  // Base classes for form inputs
  const inputBaseClass =
    "block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Leave Application
      </h2>

      <div className="lg:flex lg:gap-8">
        
        {/* --- LEFT COLUMN: LEAVE FORM --- */}
        <div className="lg:w-1/3 lg:max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md"
          >
            <div>
              <label
                htmlFor="fromDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={form.fromDate}
                onChange={handleChange}
                required
                className={inputBaseClass}
              />
            </div>

            <div>
              <label
                htmlFor="toDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                required
                className={inputBaseClass}
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason
              </label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Reason for leave"
                value={form.reason}
                onChange={handleChange}
                required
                rows={4}
                className={inputBaseClass}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-green-600 px-4 py-2 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-green-400"
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply Leave"}
            </button>
          </form>
        </div>

        {/* --- RIGHT COLUMN: LEAVE HISTORY --- */}
        <div className="lg:w-2/3 mt-12 lg:mt-0">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Leave History
          </h3>
          
          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="text-gray-600">Loading history...</p>
            ) : leaves.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-md">
                No leave requests found.
              </div>
            ) : (
              leaves.map((l) => (
                <div
                  key={l._id}
                  className="rounded-xl bg-white p-5 shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    {/* Status */}
                    <StatusBadge status={l.status} />
                    {/* Date Applied */}
                    <span className="text-xs text-gray-500">
                      {new Date(l.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="flex gap-6 mb-3 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">From: </span>
                      {l.fromDate.substring(0, 10)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">To: </span>
                      {l.toDate.substring(0, 10)}
                    </p>
                  </div>

                  {/* Reason */}
                  <p className="text-sm text-gray-800 mb-3">
                    <span className="font-medium text-gray-900">Reason: </span>
                    {l.reason}
                  </p>
                  
                  {/* Warden Comment */}
                  {l.wardenComment && (
                    <div className="mt-3 border-t border-gray-100 pt-3">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium text-gray-900">
                          Warden Comment:{" "}
                        </span>
                        {l.wardenComment}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}