import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyLeave, fetchMyLeaves } from "../features/leave/leaveSlice";

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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Leave Application</h2>
          <p className="text-slate-500">Apply for gate passes or extended leave.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* --- LEFT COL: APPLY FORM (Sticky) --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
                <span>📝</span> New Request
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase text-gray-500">From</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={form.fromDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase text-gray-500">To</label>
                    <input
                      type="date"
                      name="toDate"
                      value={form.toDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase text-gray-500">Reason</label>
                  <textarea
                    name="reason"
                    placeholder="E.g. Going home for sister's wedding..."
                    value={form.reason}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:bg-blue-300"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT COL: HISTORY LIST --- */}
          <div className="lg:col-span-8">
            <h3 className="mb-6 flex items-center justify-between text-xl font-bold text-gray-800">
              <span>📜 Your History</span>
              <span className="text-sm font-normal text-gray-400">{leaves.length} Records</span>
            </h3>
            
            <div className="space-y-4">
              {loading && leaves.length === 0 ? (
                // Skeleton
                [1, 2, 3].map((i) => (
                  <div key={i} className="h-40 animate-pulse rounded-xl bg-white p-6 shadow-sm"></div>
                ))
              ) : leaves.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-16 text-center">
                  <div className="mb-4 text-4xl">🏖️</div>
                  <h4 className="text-lg font-bold text-gray-700">No Leave History</h4>
                  <p className="text-sm text-gray-400">You haven't applied for any leave yet.</p>
                </div>
              ) : (
                // List
                leaves.map((l) => (
                  <div
                    key={l._id}
                    className="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                  >
                    {/* Header: Status & Date Applied */}
                    <div className="flex items-start justify-between border-b border-gray-50 pb-4 mb-4">
                      <div>
                         <StatusBadge status={l.status} />
                         <p className="mt-2 text-xs text-gray-400">Applied on: {new Date(l.createdAt).toLocaleDateString()}</p>
                      </div>
                      
                      {/* Date Blocks */}
                      <div className="flex items-center gap-3 text-center">
                        <div className="rounded-lg bg-gray-50 px-3 py-2 border border-gray-100">
                           <span className="block text-xs font-bold text-gray-400 uppercase">From</span>
                           <span className="font-bold text-gray-800">{new Date(l.fromDate).toLocaleDateString(undefined, {day:'numeric', month:'short'})}</span>
                        </div>
                        <span className="text-gray-300">➞</span>
                        <div className="rounded-lg bg-gray-50 px-3 py-2 border border-gray-100">
                           <span className="block text-xs font-bold text-gray-400 uppercase">To</span>
                           <span className="font-bold text-gray-800">{new Date(l.toDate).toLocaleDateString(undefined, {day:'numeric', month:'short'})}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-800 leading-relaxed">
                        "{l.reason}"
                      </p>
                    </div>
                    
                    {/* Warden Comment (Conditional) */}
                    {l.wardenComment && (
                      <div className={`rounded-lg p-3 text-sm border ${
                        l.status === 'Rejected' 
                          ? 'bg-red-50 border-red-100 text-red-800' 
                          : 'bg-blue-50 border-blue-100 text-blue-800'
                      }`}>
                        <span className="font-bold mr-1">👮 Warden:</span>
                        {l.wardenComment}
                      </div>
                    )}
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