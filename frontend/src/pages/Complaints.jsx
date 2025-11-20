import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComplaint,
  fetchMyComplaints,
} from "../features/complaint/complaintSlice";

// --- UI HELPER: Status Badge ---
const StatusBadge = ({ status }) => {
  const getStyle = () => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-700 border-green-200";
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStyle()}`}>
      <span className={`h-2 w-2 rounded-full ${status === "Resolved" ? "bg-green-500" : status === "In Progress" ? "bg-blue-500" : "bg-yellow-500"}`}></span>
      {status}
    </span>
  );
};

export default function Complaints() {
  const dispatch = useDispatch();
  const { complaints, loading } = useSelector((state) => state.complaint);

  const [form, setForm] = useState({
    category: "Electricity", // Default value
    description: "",
    roomNumber: "",
  });

  useEffect(() => {
    dispatch(fetchMyComplaints());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createComplaint(form));
    setForm({ category: "Electricity", description: "", roomNumber: "" });
  };

  // Common Categories
  const categories = ["Electricity", "Water", "Internet/Wi-Fi", "Cleaning", "Furniture", "Other"];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">File a Complaint</h2>
          <p className="text-slate-500">Report maintenance issues or concerns.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* --- LEFT COL: FORM (Sticky) --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
                <span>🛠️</span> New Issue
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Category Select */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase text-gray-500">Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {/* Room Number */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase text-gray-500">Room Number</label>
                  <input
                    type="text"
                    name="roomNumber"
                    placeholder="e.g. A-101"
                    value={form.roomNumber}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase text-gray-500">Description</label>
                  <textarea
                    name="description"
                    placeholder="Describe the issue..."
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:bg-blue-300"
                >
                  {loading ? (
                    <>
                       <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       Submitting...
                    </>
                  ) : (
                    "Report Issue"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT COL: HISTORY --- */}
          <div className="lg:col-span-8">
            <h3 className="mb-6 flex items-center justify-between text-xl font-bold text-gray-800">
              <span>📋 History</span>
              <span className="text-sm font-normal text-gray-400">{complaints.length} Records</span>
            </h3>
            
            <div className="space-y-4">
              {loading && complaints.length === 0 ? (
                // Skeleton
                [1, 2, 3].map((i) => (
                  <div key={i} className="h-32 animate-pulse rounded-xl bg-white p-6 shadow-sm"></div>
                ))
              ) : complaints.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-16 text-center">
                  <div className="mb-4 rounded-full bg-green-50 p-4">
                     <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-700">No Complaints Filed</h4>
                  <p className="text-sm text-gray-400">Everything seems to be working perfectly!</p>
                </div>
              ) : (
                // Complaint List
                complaints.map((c) => (
                  <div
                    key={c._id}
                    className="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{c.category}</h3>
                          <p className="text-xs text-gray-400">Room: {c.roomNumber}</p>
                        </div>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>

                    <div className="ml-[52px]">
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
                        {c.description}
                      </p>
                      <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                        <span>📅</span> {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}