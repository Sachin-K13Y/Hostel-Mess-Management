import { useSelector } from "react-redux";

export default function StudentProfile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // Helper component for profile rows to keep the main return clean
  const ProfileRow = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 px-6 py-4">
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd className="col-span-2 text-sm font-semibold text-gray-900">
        {value}
      </dd>
    </div>
  );

  return (
    // Page container
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      {/* Page Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        <dl className="divide-y divide-gray-200">
          <ProfileRow label="Name" value={user.name} />
          <ProfileRow label="Email" value={user.email} />
          <ProfileRow label="Role" value={user.role} />
          
          {user.hostel && (
            <ProfileRow label="Hostel" value={user.hostel} />
          )}
          {user.roomNumber && (
            <ProfileRow label="Room Number" value={user.roomNumber} />
          )}
          {user.roll && (
            <ProfileRow label="Roll" value={user.roll} />
          )}
        </dl>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => alert("Password change will be added next!")}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}