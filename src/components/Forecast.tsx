import React from "react";

export default function Forecast({ title, items }) {
  console.log(items[0].title);
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item, index) => {
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
