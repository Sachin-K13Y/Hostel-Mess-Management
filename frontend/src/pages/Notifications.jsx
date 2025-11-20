import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../features/notification/notificationSlice";

export default function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const markRead = (id, isRead) => {
    if (!isRead) {
      dispatch(markNotificationRead(id));
    }
  };

  // --- DATE FORMATTER ---
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Notifications</h2>
            <p className="text-slate-500">Stay updated with the latest announcements.</p>
          </div>
          <div className="rounded-full bg-white px-4 py-1 text-sm font-medium text-slate-600 shadow-sm border border-gray-200">
            {notifications.filter((n) => !n.read).length} Unread
          </div>
        </div>

        {/* Content */}
        {loading ? (
          // Skeleton Loader
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex animate-pulse gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                  <div className="h-3 w-3/4 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-6 text-gray-400">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">All caught up!</h3>
            <p className="text-gray-500">You have no new notifications.</p>
          </div>
        ) : (
          // Notification List
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => markRead(n._id, n.read)}
                className={`group relative flex cursor-pointer gap-4 rounded-xl border p-5 transition-all duration-200 hover:shadow-md 
                  ${
                    n.read
                      ? "border-gray-100 bg-white opacity-90 hover:opacity-100"
                      : "border-blue-100 bg-blue-50/50 shadow-sm"
                  }`}
              >
                {/* Icon Side */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors 
                    ${n.read ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-600"}`}
                >
                  {n.read ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  )}
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className={`text-base font-semibold ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {n.title}
                    </h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {formatDate(n.createdAt)}
                    </span>
                  </div>
                  
                  <p className={`mt-1 text-sm leading-relaxed ${n.read ? 'text-gray-500' : 'text-gray-700'}`}>
                    {n.message}
                  </p>
                </div>

                {/* Unread Dot Indicator */}
                {!n.read && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 sm:static sm:opacity-100 sm:translate-y-0">
                    <span className="block h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}