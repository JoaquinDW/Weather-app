import React from "react";

interface Item {
  title: string;
  icon: string;
  temp: number;
  Date: string;
}

interface ForecastProps {
  title: string;
  items: Item[];
}

export default function Forecast({ title, items }: ForecastProps): JSX.Element {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item: Item, index: number) => {
          return (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <p className="font-light text-sm">
                {item.title ? item.title : item.Date}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                className="w-13 my-1"
                alt=""
              />
              <p className="font-medium">{item.temp} °C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
