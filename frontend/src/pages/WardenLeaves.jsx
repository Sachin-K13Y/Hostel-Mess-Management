import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLeaves,
  updateLeaveStatus,
} from "../features/leave/leaveSlice";
import WardenLeaveCard from "../components/WardenLeaveCard";

export default function WardenLeaves() {
  const dispatch = useDispatch();
  const { leaves, loading } = useSelector((state) => state.leave);

  // Default to "Pending" as that's the most actionable view
  const [filter, setFilter] = useState("Pending");

  useEffect(() => {
    dispatch(fetchAllLeaves());
  }, [dispatch]);

  const filtered = leaves.filter((l) =>
    filter === "All" ? true : l.status === filter
  );

  const handleUpdateStatus = (id, status, wardenComment) => {
    dispatch(updateLeaveStatus({ id, status, wardenComment }));
  };

  // --- UI HELPER: Tab Button ---
  const FilterTab = ({ label }) => (
    <button
      onClick={() => setFilter(label)}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
        filter === label
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      
      {/* --- HEADER & FILTER --- */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Leave Requests</h2>
          <p className="text-slate-500">Manage student leave applications</p>
        </div>

        {/* Modern Segmented Filter */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <FilterTab label="Pending" />
          <FilterTab label="Approved" />
          <FilterTab label="Rejected" />
          <FilterTab label="All" />
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      {loading ? (
        // Skeleton Loader
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 animate-pulse rounded-xl bg-gray-200"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        // Empty State
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
          <div className="mb-4 rounded-full bg-gray-50 p-4">
            {filter === "Pending" ? (
              <span className="text-4xl">✅</span>
            ) : (
              <span className="text-4xl">📂</span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            {filter === "Pending" ? "All Caught Up!" : "No Records Found"}
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {filter === "Pending"
              ? "There are no pending leave requests requiring your attention right now."
              : `There are no ${filter.toLowerCase()} leave requests in the system.`}
          </p>
        </div>
      ) : (
        // Result Grid
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <WardenLeaveCard
              key={l._id}
              leave={l}
              onUpdateStatus={handleUpdateStatus}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}