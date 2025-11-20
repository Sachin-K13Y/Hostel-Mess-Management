import { useState } from "react";

export default function IotHeadcount() {
  const [liveData, setLiveData] = useState(null);   // ⬅ Live only
  const [loading, setLoading] = useState(false);

  // Sample structured old data grouped by date & slot
  const sampleHistory = [
    {
      date: "2025-01-20",
      morning: {
        count: 110,
        temperature: 29,
        humidity: 58,
        dayType: "normal",
        isHoliday: false,
      },
      noon: {
        count: 130,
        temperature: 31,
        humidity: 60,
        dayType: "normal",
        isHoliday: false,
      },
      night: {
        count: 100,
        temperature: 27,
        humidity: 62,
        dayType: "normal",
        isHoliday: false,
      },
    },
    {
      date: "2025-01-19",
      morning: {
        count: 85,
        temperature: 28,
        humidity: 52,
        dayType: "exam",
        isHoliday: false,
      },
      noon: {
        count: 150,
        temperature: 32,
        humidity: 55,
        dayType: "exam",
        isHoliday: false,
      },
      night: {
        count: 120,
        temperature: 29,
        humidity: 60,
        dayType: "exam",
        isHoliday: false,
      },
    },
  ];

  const fetchHeadcount = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/iot/fake-headcount");
      const json = await res.json();

      setLiveData(json); // ⬅ Only show live, do NOT add to table
    } catch (err) {
      console.error("Error fetching IoT data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render a table cell
  const renderCell = (slot) => {
    if (!slot)
      return <td className="p-3 border text-center text-gray-500">-</td>;

    return (
      <td className="p-3 border text-center">
        <div className="font-semibold text-lg text-blue-700">{slot.count}</div>
        <div className="text-sm text-gray-600">
          Temp: {slot.temperature}°C | Hum: {slot.humidity}%
        </div>
        <div className="text-xs mt-1">
          Day:{" "}
          <span className="px-1 py-0.5 bg-blue-100 text-blue-700 rounded">
            {slot.dayType}
          </span>
        </div>
        <div className="text-xs">
          Holiday:{" "}
          {slot.isHoliday ? (
            <span className="text-red-600 font-bold">Yes</span>
          ) : (
            <span className="text-green-600 font-bold">No</span>
          )}
        </div>
      </td>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        IoT Mess Headcount (Daily Summary)
      </h1>

      {/* LIVE DATA BUTTON */}
      <button
        onClick={fetchHeadcount}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        {loading ? "Fetching..." : "Fetch Live Headcount"}
      </button>

      {/* LIVE DATA CARD */}
      {liveData && (
        <div className="mt-6 p-5 bg-white rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-3">Live IoT Reading</h2>

          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Device ID:</strong> {liveData.deviceId}</p>
            <p><strong>Day Type:</strong> {liveData.dayType}</p>

            <p><strong>Count:</strong> 
              <span className="ml-2 text-2xl font-bold text-green-600">
                {liveData.count}
              </span>
            </p>

            <p><strong>Temperature:</strong> {liveData.temperature}°C</p>
            <p><strong>Humidity:</strong> {liveData.humidity}%</p>
            <p><strong>Timestamp:</strong> {new Date(liveData.timestamp).toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* TABLE */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Daily Headcount Summary</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Morning</th>
              <th className="p-3 border">Noon</th>
              <th className="p-3 border">Night</th>
            </tr>
          </thead>

          <tbody>
            {sampleHistory.map((day, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border font-semibold">{day.date}</td>
                {renderCell(day.morning)}
                {renderCell(day.noon)}
                {renderCell(day.night)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
