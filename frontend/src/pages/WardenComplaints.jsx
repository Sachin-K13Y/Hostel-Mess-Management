import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllComplaints,
  updateComplaintStatus,
} from "../features/complaint/complaintSlice";
import WardenComplaintCard from "../components/WardenComplaintCard";

export default function WardenComplaints() {
  const dispatch = useDispatch();
  const { complaints, loading } = useSelector((state) => state.complaint);

  // Default to "Pending" to focus on immediate tasks
  const [filter, setFilter] = useState("Pending");

  useEffect(() => {
    dispatch(fetchAllComplaints());
  }, [dispatch]);

  const filtered = complaints.filter((c) =>
    filter === "All" ? true : c.status === filter
  );

  const handleUpdateStatus = (id, status) => {
    dispatch(updateComplaintStatus({ id, status }));
  };

  // --- UI HELPER: Filter Tab Button ---
  const FilterTab = ({ label, value }) => {
    const isActive = filter === value;
    return (
      <button
        onClick={() => setFilter(value)}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      
      {/* --- HEADER & FILTER --- */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Student Complaints</h2>
          <p className="text-slate-500">Track and resolve hostel issues</p>
        </div>

        {/* Modern Segmented Filter */}
        <div className="inline-flex flex-wrap rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <FilterTab label="Pending" value="Pending" />
          <FilterTab label="In Progress" value="In-Progress" /> 
          <FilterTab label="Resolved" value="Resolved" />
          <FilterTab label="All" value="All" />
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      {loading ? (
        // Skeleton Loader (Grid of 3 gray boxes)
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-56 animate-pulse rounded-xl bg-gray-200"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        // Empty State
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
          <div className="mb-4 rounded-full bg-blue-50 p-4">
            {filter === "Pending" || filter === "In-Progress" ? (
              <span className="text-4xl">🎉</span>
            ) : (
              <span className="text-4xl">📂</span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            {filter === "Pending" ? "Zero Pending Issues" : "No Complaints Found"}
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {filter === "Pending"
              ? "Great work! There are no pending complaints to address right now."
              : `There are no complaints marked as '${filter}' at the moment.`}
          </p>
        </div>
      ) : (
        // Result Grid
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <WardenComplaintCard
              key={c._id}
              complaint={c}
              onUpdateStatus={handleUpdateStatus}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}