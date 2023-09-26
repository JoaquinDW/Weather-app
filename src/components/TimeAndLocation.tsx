import React from "react";
import { formatToLocalTime } from "../Services/controllers";
import { Weather } from "../types";

// eslint-disable-next-line react/prop-types
function TimeAndLocation(props: any): any {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(props.weather.dt)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${props.weather.name}, ${props.weather.country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
