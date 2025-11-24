// Replace with your own OpenWeatherMap API key
const apiKey = "YOUR_API_KEY"; // set your key or leave as placeholder
const city = "Jinja"; // Example city

function showWeatherMessage(msg) {
  const weatherDiv = document.getElementById("weather-info");
  if (weatherDiv) weatherDiv.textContent = msg;
}

async function getWeather() {
  if (!apiKey || apiKey === "YOUR_API_KEY") {
    showWeatherMessage("Weather unavailable — add an OpenWeatherMap API key to scripts/weather.js");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    const current = data.list && data.list[0];
    const forecast = data.list ? data.list.slice(1, 4) : [];

    const weatherDiv = document.getElementById("weather-info");
    if (!weatherDiv) return;

    if (!current) {
      showWeatherMessage("Weather data not available.");
      return;
    }

    weatherDiv.innerHTML = `
      <p>Current: ${current.main.temp}°C, ${current.weather[0].description}</p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${forecast.map(day => `<li>${day.main.temp}°C, ${day.weather[0].description}</li>`).join("")}
      </ul>
    `;
  } catch (error) {
    console.error('Weather error:', error);
    showWeatherMessage("Error loading weather data.");
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
