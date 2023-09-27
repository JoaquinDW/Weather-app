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
    <div className="max-w-screen min-w-[100px]">
      <div className="flex items-center justify-start mt-6 text-center">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex  items-center justify-around gap-6 text-white aling-center">
        {items.map((item: Item, index: number) => {
          return (
            <div
              className="flex flex-col items-center content-center text-center justify-center"
              key={index}
            >
              <p className="font-light text-sm text-center ">
                {item.title ? item.title : item.Date}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                className="w-[90px] my-1"
                alt={item.title}
              />
              <p className="font-medium flex items-center text-center justify-center">
                {item.temp} °C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
