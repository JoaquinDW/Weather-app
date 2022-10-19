/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import type { Weather } from "../types";
import "./taildwind.css";
import SearchBar from "./components/SearchBar";
import TimeAndLocation from "./components/TimeAndLocation";
import Details from "./components/Details";
import Forecast from "./components/Forecast";
import getFormatedWeatherData from "./Services/controllers";
import DefaultCities from "./components/DefaultCities";

function App() {
  const [query, setQuery] = useState({ q: "Corrientes" });
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormatedWeatherData(query).then((data) => {
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const breakpoint = 20;
    if (weather.temp - 273.15 >= breakpoint)
      return "from-yellow-700 to-orange-700";
    if (weather.temp - 273.15 < breakpoint) return "from-cyan-700 to-blue-700";
  };

  return (
    <main
      className={`mx-auto max-w-screen-xxl py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <DefaultCities setQuery={setQuery} />
      <SearchBar setQuery={setQuery} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <Details weather={weather} />

          <Forecast title="Hourly Forecast" items={weather.WeatherHour} />
          <Forecast title="Daily Forecast" items={weather.newList} />
        </div>
      )}
    </main>
  );
}

export default App;

/*
  const [status, setStatus] = useState<"pending" | "success">("pending");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<null | City>(CITIES["corrientes"]);

  function handleChangeCity(event: React.ChangeEvent<HTMLSelectElement>) {
    setCity(CITIES[event.target.value as keyof typeof CITIES]);
  }

  
  useEffect(() => {
    clima.weather.fetch(city).then((weather) => {
      setWeather(weather);
      setStatus("success");
    });
  }, [city]);

  if (status === "pending") {
    return <div>cargando...</div>;
  }
  if (!weather) {
    return <div>Esa ciudad no existe</div>;
  }


<h1>{weather.city.name}</h1>
      <ul>
        <li>{weather.city.dt}</li>
        <li>Actual: {weather.forecast.temp} °C</li>
        <li>Min: {weather.forecast.min} °C</li>
        <li>Max: {weather.forecast.max} °C</li>
        <li>{weather.forecast.description}</li>
      </ul>
      {(console.log("anda?"), console.log(weather.city))}
      
*/
