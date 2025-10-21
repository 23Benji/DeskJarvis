import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchWeather = async (lat, lon, cityName = '') => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        setWeather(data.current_weather);
        setCity(cityName);
      } catch (err) {
        console.warn('Weather fetch failed:', err);
        setError(true);
      }
    };

    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            // Reverse geocode to get city name
            const geoRes = await fetch(
              `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
            );
            const geoData = await geoRes.json();
            const cityName = geoData?.results?.[0]?.name || '';
            fetchWeather(latitude, longitude, cityName);
          } catch {
            fetchWeather(latitude, longitude);
          }
        },
        () => {
          console.warn('Geolocation denied.');
          setError(true); // Show funny offline mode
        }
      );
    } else {
      console.warn('Geolocation not supported.');
      setError(true);
    }
  }, []);

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // ──────────────────────────────
  // 🌀 OFFLINE / NO DATA MODE
  // ──────────────────────────────
  if (error || !weather) {
    return (
      <div className="weather-horizontal">
        <div className="weather-left">☁️</div>
        <div className="weather-center">
          <div className="weather-temp">--°</div>
          <div className="weather-desc">No data — the sky’s offline</div>
        </div>
        <div className="weather-right">
          <div className="weather-time">{time}</div>
          <div className="weather-city">Unknown</div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────
  // 🌤️ NORMAL MODE
  // ──────────────────────────────
  const icon = weather.weathercode < 3 ? '☀️' : weather.weathercode < 60 ? '☁️' : '🌧️';
  const desc =
    weather.weathercode < 3
      ? 'Sunny'
      : weather.weathercode < 60
      ? 'Cloudy'
      : 'Rainy';

  return (
    <div className="weather-horizontal">
      <div className="weather-left">{icon}</div>
      <div className="weather-center">
        <div className="weather-temp">{Math.round(weather.temperature)}°</div>
        <div className="weather-desc">{desc}</div>
      </div>
      <div className="weather-right">
        <div className="weather-time">{time}</div>
        <div className="weather-city">{city || 'Unknown'}</div>
      </div>
    </div>
  );
};

export default Weather;
