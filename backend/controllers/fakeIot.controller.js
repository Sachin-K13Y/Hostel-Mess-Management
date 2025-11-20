export const getFakeHeadcount = async (req, res) => {
  // Holiday list (you can expand this)
  const holidays = [
    "2025-01-26", // Republic Day
    "2025-08-15", // Independence Day
    "2025-10-02", // Gandhi Jayanti
    "2025-11-14", // Diwali (example)
  ];

  const today = new Date().toISOString().split("T")[0];
  const isHoliday = holidays.includes(today);

  // If holiday → override dayType
  let dayType = "normal";

  if (isHoliday) {
    dayType = "holiday";
  } else {
    // Otherwise random (exam / festival / normal)
    const otherDayTypes = ["normal", "exam", "festival"];
    dayType = otherDayTypes[Math.floor(Math.random() * otherDayTypes.length)];
  }

  // Base headcount
  let baseCount = Math.floor(Math.random() * 150) + 20;

  // Apply multipliers
  if (dayType === "holiday") baseCount = Math.floor(baseCount * 0.4);
  if (dayType === "exam") baseCount = Math.floor(baseCount * 1.2);
  if (dayType === "festival") baseCount = Math.floor(baseCount * 1.4);

  const fakeData = {
    deviceId: "fake-device-1",
    timestamp: new Date(),
    isHoliday,
    dayType,
    count: baseCount,

    temperature: Number((28 + Math.random() * 5).toFixed(1)),
    humidity: Math.floor(Math.random() * 30) + 40,
  };

  return res.json(fakeData);
};
