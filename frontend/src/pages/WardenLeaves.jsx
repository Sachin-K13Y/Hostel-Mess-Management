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

  // Default to "Pending" for a better Warden UX
  const [filter, setFilter] = useState("Pending");

  useEffect(() => {
    dispatch(fetchAllLeaves());
  }, [dispatch]);

  const filtered = leaves.filter((l) =>
    filter === "All" ? true : l.status === filter
  );

  // This handler is passed down to each card
  const handleUpdateStatus = (id, status, wardenComment) => {
    dispatch(updateLeaveStatus({ id, status, wardenComment }));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      {/* Page Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Leave Requests
        </h2>
        
        <div>
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 mr-2">
            Filter by status:
          </label>
          <select
            id="status-filter"
            className="block w-full md:w-auto md:min-w-[150px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Loading / Empty State */}
      {loading && filtered.length === 0 ? (
        <p className="text-gray-600">Loading leave requests...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow-md">
          No {filter.toLowerCase()} leave applications found.
        </div>
      ) : (
        // --- Card Grid ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l) => (
            <WardenLeaveCard
              key={l._id}
              leave={l}
              onUpdateStatus={handleUpdateStatus}
              // Pass loading state to disable buttons during API calls
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}