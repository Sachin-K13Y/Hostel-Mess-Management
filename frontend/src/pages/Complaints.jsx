import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComplaint,
  fetchMyComplaints,
} from "../features/complaint/complaintSlice";

// Helper component for styling the status badge
const ComplaintStatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium capitalize";
  let statusClasses = "";

  switch (status) {
    case "Resolved":
      statusClasses = "bg-green-100 text-green-800";
      break;
    case "In Progress":
      statusClasses = "bg-blue-100 text-blue-800";
      break;
    default: // "Pending"
      statusClasses = "bg-yellow-100 text-yellow-800";
  }

  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

export default function Complaints() {
  const dispatch = useDispatch();
  const { complaints, loading } = useSelector((state) => state.complaint);

  const [form, setForm] = useState({
    category: "",
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
    setForm({ category: "", description: "", roomNumber: "" });
  };

  // Base classes for form inputs
  const inputBaseClass =
    "block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        File a Complaint
      </h2>

      <div className="lg:flex lg:gap-8">
        
        {/* --- LEFT COLUMN: COMPLAINT FORM --- */}
        <div className="lg:w-1/3 lg:max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md"
          >
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="e.g., Electricity, Water, Wi-Fi"
                value={form.category}
                onChange={handleChange}
                required
                className={inputBaseClass}
              />
            </div>

            <div>
              <label
                htmlFor="roomNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                placeholder="e.g., A-101"
                value={form.roomNumber}
                onChange={handleChange}
                required
                className={inputBaseClass}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your issue in detail"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className={inputBaseClass}
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Submitting..." : "File Complaint"}
            </button>
          </form>
        </div>

        {/* --- RIGHT COLUMN: COMPLAINT HISTORY --- */}
        <div className="lg:w-2/3 mt-12 lg:mt-0">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            My Complaint History
          </h3>
          
          <div className="flex flex-col gap-4">
            {loading && complaints.length === 0 ? (
              <p className="text-gray-600">Loading history...</p>
            ) : complaints.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-md">
                You haven't filed any complaints yet.
              </div>
            ) : (
              complaints.map((c) => (
                <div
                  key={c._id}
                  className="rounded-xl bg-white p-5 shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {c.category}
                    </h3>
                    <ComplaintStatusBadge status={c.status} />
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    {c.description}
                  </p>
                  
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                    <span className="text-sm font-medium text-gray-600">
                      Room: {c.roomNumber}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}