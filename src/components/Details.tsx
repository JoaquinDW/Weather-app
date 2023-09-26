/* eslint-disable react/prop-types */
import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "../Services/controllers";
import { Icon } from "@iconify/react";

/*
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
*/

export default function Details({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}: {
  weather: any;
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="" className="w-32" />
        <p className="text-5xl">{`${Math.round(temp - 273.15)} °C`}</p>

        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <Icon icon="uil:temperature" width={18} className="mr-1" />
            Real Fell:
            <span className="font-medium ml-1">
              {`${Math.round(feels_like - 273.15)}°C`}
            </span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <Icon icon="uil:tear" width={18} />
            Humidity:
            <span className="font-medium ml-1">{`${humidity}%`}</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <Icon icon="uil:wind" width={18} />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <Icon icon="uil:sun" />
        <p className="font-light">
          Rise:
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <Icon icon="uil:sunset" />
        <p className="font-light">Set:</p>
        <span className="font-medium ml-1">
          {" "}
          {formatToLocalTime(sunset, timezone, "hh:mm a")}
        </span>
        <p className="font-light">|</p>

        <Icon icon="uil:sun" />
        <p className="font-light">
          High:
          <span className="font-medium ml-1">
            {`${Math.round(temp_max - 273.15)}°C`}
          </span>
        </p>
        <p className="font-light">|</p>

        <Icon icon="uil:sun" />
        <p className="font-light">
          Low:
          <span className="font-medium ml-1">
            {`${Math.round(temp_min - 273.15)}°C`}
          </span>
        </p>
      </div>
    </div>
  );
}
