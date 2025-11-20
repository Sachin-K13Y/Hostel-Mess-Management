import { useSelector } from "react-redux";

export default function StudentProfile() {
  const { user } = useSelector((state) => state.auth);

  // Helper to get initials for the avatar (e.g. "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // --- Loading State ---
  if (!user) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  // --- Reusable Detail Item ---
  const ProfileField = ({ label, value, icon }) => (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-white hover:shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="font-semibold text-gray-800 break-all">{value || "Not Provided"}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-6 md:p-10">
      
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        
        {/* --- HEADER SECTION (Gradient) --- */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-6 pb-8 pt-10 text-center md:px-10">
          
          {/* Avatar Circle */}
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/20 text-3xl font-bold text-white shadow-lg backdrop-blur-sm">
            {getInitials(user.name)}
          </div>
          
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          
          {/* Role Badge */}
          <div className="mt-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-md border border-white/30">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            {user.role ? user.role.toUpperCase() : "STUDENT"}
          </div>
        </div>

        {/* --- BODY SECTION --- */}
        <div className="p-6 md:p-10">
          <h3 className="mb-6 text-lg font-bold text-gray-800 border-b pb-2">
            Personal Details
          </h3>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            
            <ProfileField
              label="Email Address"
              value={user.email}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            <ProfileField
              label="Roll Number"
              value={user.roll}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884.386 1.679 1 2.245" />
                </svg>
              }
            />

            <ProfileField
              label="Hostel Block"
              value={user.hostel}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />

            <ProfileField
              label="Room Number"
              value={user.roomNumber}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 9.636a6 6 0 113.642-5.636z" />
                </svg>
              }
            />
          </div>

          {/* Action Buttons Area */}
          <div className="mt-10 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:justify-end">
            <button
              onClick={() => alert("Feature coming soon!")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200"
            >
              Edit Profile
            </button>
            <button
              onClick={() => alert("Password change modal would open here")}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}