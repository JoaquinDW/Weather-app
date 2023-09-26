import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function SearchBar({ setQuery }: any) {
  const [city, setCity] = useState("");
  const handleSearchCity = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize"
        />
        <Icon
          width={25}
          icon="uil:search"
          //size={25}
          className="text-white cursor-pointer  transition ease-out hover:scale-125"
          onClick={handleSearchCity}
        />
        <Icon
          width={25}
          icon="uil:location-point"
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={getLocationWeather}
        />
      </div>
    </div>
  );
}
