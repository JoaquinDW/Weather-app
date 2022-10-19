import type { Weather } from "../src/types";
import { DateTime } from "luxon";

export type RawWeather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const apiKey = "923c12a56b9f714ede562b89e7c9523f";
const OriginUrl = "https://api.openweathermap.org/data/2.5";

export function getWeatherData(infoType, searchParams) {
  const url = new URL(OriginUrl + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: apiKey });
  return fetch(url).then((res) => res.json());
}

export const formatCurrentWeather = (data: RawWeather): Weather => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    timezone,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  console.log(data.coord);

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    timezone,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

export function KelvinToCelcius(temp) {
  return Math.round(temp - 273.15);
}

const formatForecastWeather = (data) => {
  // eslint-disable-next-line prefer-const
  let { timezone, list } = data;
  const { 0: first, 8: second, 16: third, 24: fourth, 32: fifth } = list;

  const newList = [first, second, third, fourth, fifth].map((day) => {
    return {
      Date: formatToLocalTime(day.dt, timezone, "ccc"),
      temp: KelvinToCelcius(day.main.temp), //Math.round(response.main.temp - 273.15)
      icon: day.weather[0].icon,
    };
  });
  // new Date(1665597600 * 1000).toLocaleDateString("es-AR")
  const { 1: one, 2: two, 3: three, 4: four, 5: five } = list;
  const WeatherHour = [one, two, three, four, five].map((hour) => {
    return {
      title: formatToLocalTime(hour.dt, timezone, "hh:mm a"),
      temp: KelvinToCelcius(hour.main.temp),
      icon: hour.weather[0].icon,
    };
  });
  /*hourly = hourly.slice(1, 6).map((hour) => {
    return {
      title: formatToLocalTime(hour.dt, timezone, "hh:mm a"),
      temp: hour.temp,
      icon: hour.weather[0].icon,
    };
  });*/
  return { timezone, newList, WeatherHour };
};

const getFormatedWeatherData = async (searchParams) => {
  const formatedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);
  console.log(searchParams.q);

  const { lat, lon } = formatedCurrentWeather;

  const formatedForecastWeather = await getWeatherData("forecast", {
    searchParams,
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formatedCurrentWeather, ...formatedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy'") =>
  DateTime.fromSeconds(secs).setZone("UTC-3").toFormat(format);
//DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
const iconUrlFromCode = (code) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
};
export default getFormatedWeatherData;
export { iconUrlFromCode, formatToLocalTime };

/*export const clima = {
  weather: {
    fetch: async (city: City): Promise<Weather> => {
      const req = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`
      );
      const response: RawWeather = await req.json();

      return {
        city: {
          id: city.id,
          name: city.name,
          dt: new Date(response.dt * 1000).toLocaleDateString("es-AR"),
        },
        forecast: {
          temp: Math.round(response.main.temp - 273.15),
          min: Math.round(response.main.temp_min - 273.15),
          max: Math.round(response.main.temp_max - 273.15),
          description: response.weather[0].description,
        },
      };
    },
  },
};
/*const getCurrentWeather = async (city: City): Promise<Weather> => {
  const apiUrl = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`
  );
  const response: RawWeather = await apiUrl.json();
  return {
    city: {
      id: city.id,
      name: city.name,
      dt: new Date(response.dt * 1000).toLocaleDateString("es-AR"),
    },
    forecast: {
      temp: Math.round(response.main.temp - 273.15),
      min: Math.round(response.main.temp_min - 273.15),
      max: Math.round(response.main.temp_max - 273.15),
      description: response.weather[0].description,
    },
  };
};*/
