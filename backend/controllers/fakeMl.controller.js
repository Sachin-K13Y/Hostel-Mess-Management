export const getFakeFoodPrediction = (req, res) => {
  const { headcount, temperature, humidity, isHoliday } = req.query;

  const hc = Number(headcount || 80);
  const temp = Number(temperature || 30);
  const hum = Number(humidity || 60);

  // Base per person (kg of food per meal)
  let perPerson = 0.35;

  // Temperature effect: hotter → more water & light food → slight increase
  if (temp > 32) perPerson += 0.02;

  // Humidity effect
  if (hum > 65) perPerson -= 0.01;

  // Holiday effect
  if (isHoliday === "true") perPerson *= 1.15;

  const predictedKg = Number((perPerson * hc).toFixed(2));

  res.json({
    headcount: hc,
    temperature: temp,
    humidity: hum,
    predictedKg,
    perPersonKg: perPerson,
  });
};
