/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react"
//import type { Weather } from "./types/Weather";
import "./taildwind.css"
import SearchBar from "./components/SearchBar"
import TimeAndLocation from "./components/TimeAndLocation"
import Details from "./components/Details"
import Forecast from "./components/Forecast"
import getFormatedWeatherData from "./Services/controllers"
import DefaultCities from "./components/DefaultCities"

function App() {
  const [query, setQuery] = useState({ q: "Corrientes" })
  const [weather, setWeather] = useState<any>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormatedWeatherData(query).then((data) => {
        setWeather(data)
      })
    }
    fetchWeather()
  }, [query])

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700"
    const breakpoint = 25
    if (weather.temp - 273.15 >= breakpoint)
      return "from-yellow-700 to-orange-700"
    if (weather.temp - 273.15 < breakpoint) return "from-cyan-700 to-blue-700"
  }

  return (
    <main
      className={`mx-auto max-w-screen-xl py-5 px-6 xl:px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
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
      <footer className="pt-10">
        <p className="text-center text-gray-200 text-xs">
          Created by Joaquin De Weert
        </p>
      </footer>
    </main>
  )
}

export default App
