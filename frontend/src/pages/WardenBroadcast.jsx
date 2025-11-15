import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendBroadcast } from "../features/notification/notificationSlice";

export default function WardenBroadcast() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.notification);

  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");

  const handleSend = () => {
    if (!title || !msg) {
      alert("Title and message are required!");
      return;
    }

    dispatch(sendBroadcast({ title, message: msg }))
      .unwrap()
      .then(() => {
        setSuccess("Broadcast sent successfully!");
        setTitle("");
        setMsg("");

        setTimeout(() => setSuccess(""), 3000); // Give a bit more time
      })
      .catch(() => {});
  };

  // Base classes for form inputs
  const inputBaseClass =
    "block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Send Broadcast Message
        </h2>
        
        <div className="flex flex-col gap-5">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className={inputBaseClass}
              placeholder="Enter notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              className={`${inputBaseClass} min-h-[140px]`}
              placeholder="Write message for all students"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>

          {/* Send Button */}
          <button
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Broadcast"}
          </button>

          {/* Success Message */}
          {success && (
            <p className="rounded-md bg-green-50 p-3 text-center text-sm font-medium text-green-700">
              {success}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}