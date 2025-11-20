import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendBroadcast } from "../features/notification/notificationSlice";

export default function WardenBroadcast() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.notification);

  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    // Reset states
    setError("");
    setSuccess("");

    if (!title.trim() || !msg.trim()) {
      setError("Please provide both a title and a message.");
      return;
    }

    dispatch(sendBroadcast({ title, message: msg }))
      .unwrap()
      .then(() => {
        setSuccess("Broadcast sent successfully! All students have been notified.");
        setTitle("");
        setMsg("");
        // Clear success message after 4 seconds
        setTimeout(() => setSuccess(""), 4000);
      })
      .catch((err) => {
        setError(err.message || "Failed to send broadcast. Please try again.");
      });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 md:p-10 flex flex-col items-center">
      
      {/* --- CARD CONTAINER --- */}
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {/* Megaphone Icon SVG */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Broadcast Announcement</h2>
            <p className="text-sm text-slate-500">Send a push notification to all registered students.</p>
          </div>
        </div>

        {/* Form Area */}
        <div className="space-y-6">
          
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">
              Subject / Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Emergency Maintenance or Holiday Notice"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-slate-800 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="mb-2 flex justify-between text-sm font-semibold text-slate-700">
              <span>Message Body</span>
              <span className="text-xs font-normal text-gray-400">{msg.length} characters</span>
            </label>
            <textarea
              id="message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your detailed message here..."
              className="min-h-[150px] w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-slate-800 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <p className="mt-2 text-xs text-gray-500">
              * This message will appear in the student's notification tab immediately.
            </p>
          </div>

          {/* Feedback Messages (Error / Success) */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-100 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          {success && (
            <div className="animate-fade-in rounded-lg bg-green-50 p-4 text-sm text-green-700 border border-green-100 flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {success}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <span>Send Broadcast</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </>
            )}
          </button>

        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 max-w-2xl text-center">
        <p className="text-sm text-gray-400">
          <strong>Tip:</strong> Keep titles short (under 50 chars) for better visibility on mobile notifications.
        </p>
      </div>

    </div>
  );
}