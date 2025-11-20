import { useState } from "react";

export default function IotHeadcount() {
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample structured old data grouped by date & slot
  const sampleHistory = [
    {
      date: "2025-01-20",
      morning: { count: 110, temperature: 29, humidity: 58, dayType: "normal", isHoliday: false },
      noon: { count: 130, temperature: 31, humidity: 60, dayType: "normal", isHoliday: false },
      night: { count: 100, temperature: 27, humidity: 62, dayType: "normal", isHoliday: false },
    },
    {
      date: "2025-01-19",
      morning: { count: 85, temperature: 28, humidity: 52, dayType: "exam", isHoliday: false },
      noon: { count: 150, temperature: 32, humidity: 55, dayType: "exam", isHoliday: false },
      night: { count: 120, temperature: 29, humidity: 60, dayType: "exam", isHoliday: false },
    },
    {
      date: "2025-01-18",
      morning: { count: 95, temperature: 27, humidity: 50, dayType: "holiday", isHoliday: true },
      noon: { count: 110, temperature: 30, humidity: 53, dayType: "holiday", isHoliday: true },
      night: { count: 90, temperature: 26, humidity: 58, dayType: "holiday", isHoliday: true },
    },
  ];

  const fetchHeadcount = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulating API call for demo purposes if backend isn't running
      // In production, remove the timeout and uncomment the fetch
      /*
      const res = await fetch("http://localhost:3000/api/iot/fake-headcount");
      const json = await res.json();
      setLiveData(json);
      */

      // Mock Response for UI Demo
      setTimeout(() => {
        setLiveData({
          deviceId: "CAM-01-MESS-A",
          dayType: "normal",
          count: Math.floor(Math.random() * 50) + 100, // Random count 100-150
          temperature: 30.5,
          humidity: 55,
          timestamp: new Date().toISOString(),
        });
        setLoading(false);
      }, 1000);

    } catch (err) {
      console.error("Error fetching IoT data:", err);
      setError("Failed to connect to IoT Sensor.");
      setLoading(false);
    }
  };

  // Helper for Badges
  const getBadgeStyles = (type, isHoliday) => {
    if (isHoliday) return "bg-red-100 text-red-700 border-red-200";
    if (type === "exam") return "bg-purple-100 text-purple-700 border-purple-200";
    return "bg-blue-50 text-blue-700 border-blue-100";
  };

  // Helper to render a table cell
  const renderCell = (slot) => {
    if (!slot) return <td className="border-b border-gray-100 p-4 text-center text-gray-400">-</td>;

    return (
      <td className="border-b border-gray-100 p-4 align-top">
        <div className="flex flex-col items-center gap-2">
          {/* Count Circle */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 font-bold text-slate-800 ring-1 ring-gray-200">
            {slot.count}
          </div>
          
          {/* Stats */}
          <div className="flex gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              🌡️ {slot.temperature}°
            </span>
            <span className="flex items-center gap-1">
              💧 {slot.humidity}%
            </span>
          </div>

          {/* Badge */}
          <span className={`mt-1 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${getBadgeStyles(slot.dayType, slot.isHoliday)}`}>
            {slot.isHoliday ? "Holiday" : slot.dayType}
          </span>
        </div>
      </td>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">IoT Live Monitor</h1>
            <p className="text-slate-500">Real-time mess headcount & environmental data.</p>
          </div>
          
          <button
            onClick={fetchHeadcount}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Syncing Sensor...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Live Data
              </>
            )}
          </button>
        </div>

        {/* --- LIVE DATA SECTION --- */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          
          {/* Live Card */}
          <div className="md:col-span-12 lg:col-span-8">
            {liveData ? (
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-blue-100">
                
                {/* Live Indicator */}
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-100">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                  </span>
                  LIVE FEED
                </div>

                <h2 className="text-lg font-semibold text-gray-500 mb-1">Current Occupancy</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-extrabold text-slate-800">{liveData.count}</span>
                  <span className="text-xl font-medium text-gray-400">Students</span>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t pt-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">Temperature</p>
                    <p className="text-lg font-semibold text-slate-700 flex items-center gap-1">
                      <span className="text-orange-500">🌡️</span> {liveData.temperature}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">Humidity</p>
                    <p className="text-lg font-semibold text-slate-700 flex items-center gap-1">
                      <span className="text-blue-500">💧</span> {liveData.humidity}%
                    </p>
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase text-gray-400">Sensor ID</p>
                     <p className="text-sm font-semibold text-slate-700">{liveData.deviceId}</p>
                  </div>
                  <div>
                     <p className="text-xs font-bold uppercase text-gray-400">Last Sync</p>
                     <p className="text-sm font-semibold text-slate-700">Just now</p>
                  </div>
                </div>
              </div>
            ) : (
              // Empty/Initial State for Live Card
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <div className="rounded-full bg-gray-200 p-4 mb-3">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No live data loaded.</p>
                <p className="text-sm text-gray-400">Click "Refresh Live Data" to connect to sensors.</p>
              </div>
            )}
          </div>

          {/* Info Card (Static context) */}
          <div className="md:col-span-12 lg:col-span-4">
             <div className="h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-lg">
               <h3 className="text-lg font-bold mb-4">Sensor Status</h3>
               <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex items-center justify-between">
                   <span>Device A (Main Hall)</span>
                   <span className="flex items-center gap-1 text-green-400 text-xs font-bold uppercase">
                     <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                   </span>
                 </li>
                 <li className="flex items-center justify-between">
                   <span>Device B (Entrance)</span>
                   <span className="flex items-center gap-1 text-green-400 text-xs font-bold uppercase">
                     <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                   </span>
                 </li>
                 <li className="flex items-center justify-between">
                   <span>Device C (Serving Area)</span>
                   <span className="flex items-center gap-1 text-red-400 text-xs font-bold uppercase">
                     <span className="h-2 w-2 rounded-full bg-red-500"></span> Offline
                   </span>
                 </li>
               </ul>
               <div className="mt-8 text-xs text-slate-500 border-t border-slate-700 pt-4">
                 * Data refreshes every 30 seconds automatically when connected.
               </div>
             </div>
          </div>
        </div>

        {/* --- HISTORICAL TABLE --- */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-slate-800">Daily Headcount Summary</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-xs font-bold uppercase text-gray-400 border-b border-gray-100">
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Morning</th>
                  <th className="p-4 text-center">Noon</th>
                  <th className="p-4 text-center">Night</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sampleHistory.map((day, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 font-medium text-slate-700 align-top">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    {renderCell(day.morning)}
                    {renderCell(day.noon)}
                    {renderCell(day.night)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}