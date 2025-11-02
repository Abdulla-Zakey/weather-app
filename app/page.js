"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import LoginScreen from "./components/LoginScreen";
import DashboardHeader from "./components/DashboardHeader";
import WeatherGrid from "./components/WeatherGrid";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadCities();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loadCities = async () => {
    setLoadingWeather(true);
    try {
      const response = await fetch("/cities.json");
      const data = await response.json();
      const cityList = data.List || [];

      console.log("Loaded cities:", cityList);
      setCities(cityList);
      await fetchWeatherForCities(cityList);
    } catch (error) {
      console.error("Error loading cities:", error);
    } finally {
      setLoadingWeather(false);
    }
  };

  const fetchWeatherForCities = async (cityList) => {
    const weatherPromises = cityList.map((city) =>
      fetch(`/api/weather?cityId=${city.CityCode}`)
        .then((res) => res.json())
        .then((data) => ({ cityCode: city.CityCode, data }))
        .catch((err) => {
          console.error(`Error fetching weather for ${city.CityName}:`, err);
          return { cityCode: city.CityCode, error: true };
        })
    );

    const results = await Promise.all(weatherPromises);
    const weatherMap = {};
    results.forEach((result) => {
      weatherMap[result.cityCode] = result.data || { error: true };
    });

    setWeatherData(weatherMap);
  };

  if (loading) {
    return <LoadingSpinner message="Loading..." />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-600 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader userEmail={user.email} />
        <WeatherGrid
          cities={cities}
          weatherData={weatherData}
          loading={loadingWeather}
        />
      </div>
    </div>
  );
}
