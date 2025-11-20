import { useState, useEffect } from "react";

export default function MessPrediction() {
  // Initialize state with lazy loading for localStorage to prevent flicker
  const [history, setHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mess-history");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [inputs, setInputs] = useState({
    dayType: "normal",
    headcount: "", // User must input this now for accuracy
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- 1. CONFIGURATION & UTILS ---

  // Standard Ratios (Must sum to ~1.0)
  const RATIOS = {
    rice: 0.35,
    roti: 0.25,
    dal: 0.20,
    sabji: 0.15,
    salad: 0.05,
  };

  function daysAgo(num) {
    const d = new Date();
    d.setDate(d.getDate() - num);
    return d;
  }

  function calculateBreakdown(totalKg, dayType) {
    const parts = {
      rice: (totalKg * RATIOS.rice).toFixed(2),
      roti: (totalKg * RATIOS.roti).toFixed(2),
      dal: (totalKg * RATIOS.dal).toFixed(2),
      sabji: (totalKg * RATIOS.sabji).toFixed(2),
      salad: (totalKg * RATIOS.salad).toFixed(2),
      sweet: "0.00",
    };

    // Festivals get sweets (added on top of total, or adjusting total)
    if (dayType === "festival") {
      // Let's say sweets are 10% of the main food weight
      parts.sweet = (totalKg * 0.10).toFixed(2); 
    }

    return parts;
  }

  // --- 2. INITIAL DATA GENERATION ---

  useEffect(() => {
    if (history.length === 0) {
      const generatedData = Array.from({ length: 10 }).map((_, i) => {
        const day = 10 - i;
        const hc = Math.floor(Math.random() * (160 - 100) + 100); // 100-160 people
        const foodPerPerson = 0.45; // approx 450g per person
        const totalFood = (hc * foodPerPerson).toFixed(2);
        
        return {
          timestamp: daysAgo(day).toISOString(),
          temperature: Math.floor(Math.random() * (35 - 25) + 25), // 25-35°C
          humidity: Math.floor(Math.random() * (70 - 40) + 40),
          headcount: hc,
          totalFood: Number(totalFood),
          parts: calculateBreakdown(totalFood, "normal"),
        };
      });
      
      // Sort by date descending (newest first)
      const sorted = generatedData.reverse();
      setHistory(sorted);
      localStorage.setItem("mess-history", JSON.stringify(sorted));
    }
  }, [history.length]); // Only run if history is empty

  // --- 3. PREDICTION LOGIC ---

  const handlePredict = async () => {
    if (!inputs.headcount || inputs.headcount <= 0) {
      alert("Please enter a valid expected headcount.");
      return;
    }

    setLoading(true);

    // Simulate API/Calculation Delay
    setTimeout(() => {
      try {
        // A. Calculate Average Consumption Per Person from History
        const totalConsumption = history.reduce((sum, entry) => {
            return sum + (entry.totalFood / entry.headcount);
        }, 0);
        const avgConsumptionPerPerson = totalConsumption / history.length; // e.g., 0.45kg

        // B. Simulate Current Weather (Random for demo)
        const currTemp = Math.floor(Math.random() * (36 - 28) + 28);
        const currHum = Math.floor(Math.random() * (65 - 45) + 45);

        // C. Apply Factors
        let factor = 1.0;
        let reasoning = [];

        // 1. Weather Factor: High heat reduces appetite slightly
        if (currTemp > 32) {
          factor -= 0.05;
          reasoning.push(`High temp (${currTemp}°C) reduced appetite estimate by 5%`);
        }

        // 2. Day Type Factor
        if (inputs.dayType === "festival") {
          factor += 0.15; // People eat more + variety
          reasoning.push("Festival menu: Increased quantity by 15%");
        } else if (inputs.dayType === "exam") {
          factor -= 0.05; // Stressed students might eat less?
          reasoning.push("Exam day: Slight reduction for quick meals");
        }

        // D. Final Calculation
        const baseFood = inputs.headcount * avgConsumptionPerPerson;
        const predictedTotal = baseFood * factor;

        // Breakdown
        const parts = calculateBreakdown(predictedTotal, inputs.dayType);

        const result = {
          total: predictedTotal.toFixed(2),
          temp: currTemp,
          humidity: currHum,
          parts,
          reasoning,
        };

        setPrediction(result);

        // Update History with this "Prediction" (assuming it becomes reality for the demo)
        const newEntry = {
          timestamp: new Date().toISOString(),
          temperature: currTemp,
          humidity: currHum,
          headcount: parseInt(inputs.headcount),
          totalFood: Number(predictedTotal.toFixed(2)),
          parts: parts,
        };

        const updatedHistory = [newEntry, ...history].slice(0, 15); // Keep last 15
        setHistory(updatedHistory);
        localStorage.setItem("mess-history", JSON.stringify(updatedHistory));

      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen font-sans text-gray-800">
      
      {/* HEADER */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
          🍽️ Smart Mess Predictor
        </h1>
        <p className="text-gray-500 mt-2">AI-driven food waste reduction</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* --- LEFT COL: INPUTS --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
              <span>⚙️</span> Input Parameters
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Expected Headcount</label>
                <input
                  type="number"
                  placeholder="e.g. 150 students"
                  value={inputs.headcount}
                  onChange={(e) => setInputs({ ...inputs, headcount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Occasion Type</label>
                <select
                  value={inputs.dayType}
                  onChange={(e) => setInputs({ ...inputs, dayType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="normal">Normal Day</option>
                  <option value="holiday">Weekend/Holiday</option>
                  <option value="exam">Exam Period</option>
                  <option value="festival">Festival/Feast</option>
                </select>
              </div>

              <button
                onClick={handlePredict}
                disabled={loading}
                className={`w-full py-3 rounded-lg text-lg font-bold text-white shadow-lg transition-all ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
                }`}
              >
                {loading ? "Analyzing Trends..." : "Generate Prediction"}
              </button>
            </div>
          </div>

           {/* --- REASONING / AI INSIGHTS --- */}
           {prediction && (
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-indigo-800 mb-2">🧠 AI Logic</h3>
              <ul className="list-disc list-inside text-sm text-indigo-700 space-y-1">
                <li>Based on historical avg consumption.</li>
                {prediction.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* --- RIGHT COL: RESULT --- */}
        <div>
          {prediction ? (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h2 className="text-2xl font-bold text-green-700">Recommended Prep</h2>
                   <p className="text-sm text-gray-500">
                     Weather: {prediction.temp}°C, Humidity: {prediction.humidity}%
                   </p>
                </div>
                <div className="text-right">
                   <span className="block text-4xl font-extrabold text-gray-800">{prediction.total} <span className="text-lg text-gray-500">kg</span></span>
                   <span className="text-xs text-gray-400 uppercase font-semibold">Total Raw Material</span>
                </div>
              </div>
              
              <hr className="border-gray-100 my-4" />

              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Kitchen Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(prediction.parts).map(([k, v]) => {
                  if (Number(v) <= 0 && k !== 'sweet') return null; // Skip 0s unless it's sweet which might be 0
                  return (
                    <div key={k} className="p-3 bg-gray-50 rounded-lg text-center border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">{k}</p>
                      <p className="text-lg font-bold text-blue-900">{v} kg</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 font-medium">
              Prediction results will appear here
            </div>
          )}
        </div>
      </div>

      {/* --- HISTORY TABLE --- */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            📅 Historical Data
          </h2>
          <button 
            onClick={() => { localStorage.removeItem("mess-history"); window.location.reload(); }}
            className="text-xs text-red-500 hover:underline"
          >
            Reset Data
          </button>
        </div>

        <div className="overflow-hidden rounded-xl shadow border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold border-b">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-center">Headcount</th>
                  <th className="px-4 py-3 text-center">Total (kg)</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Rice</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Roti</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Dal</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Sabji</th>
                  <th className="px-4 py-3 text-center text-indigo-600">Sweet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {new Date(row.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">{row.headcount}</td>
                    <td className="px-4 py-3 text-center font-bold text-green-600">{row.totalFood}</td>
                    <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">{row.parts?.rice}</td>
                    <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">{row.parts?.roti}</td>
                    <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">{row.parts?.dal}</td>
                    <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">{row.parts?.sabji}</td>
                    <td className="px-4 py-3 text-center text-indigo-600 font-medium">
                      {(row.parts?.sweet && row.parts.sweet > 0) ? `${row.parts.sweet}` : "-"}
                    </td>
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