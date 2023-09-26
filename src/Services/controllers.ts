import type { Weather } from "../types";
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

export function getWeatherData(
  infoType: any,
  searchParams: any
): Promise<RawWeather> {
  const url = new URL(OriginUrl + "/" + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: apiKey,
  }).toString();
  return fetch(url).then((res) => res.json());
}

export const formatCurrentWeather = (data: RawWeather): any => {
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

  /*
  return {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    timezone,
    sys: { country, sunrise, sunset },
    wind: { speed },
  };
 */

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

export function KelvinToCelcius(temp: any): number {
  return Math.round(temp - 273.15);
}

const formatForecastWeather = (data: any) => {
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
  const { 1: one, 2: two, 3: three, 4: four, 5: five } = list;
  const WeatherHour = [one, two, three, four, five].map((hour) => {
    return {
      title: formatToLocalTime(hour.dt, timezone, "hh:mm a"),
      temp: KelvinToCelcius(hour.main.temp),
      icon: hour.weather[0].icon,
    };
  });

  return { timezone, newList, WeatherHour };
};

const getFormatedWeatherData = async (searchParams: any) => {
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

const formatToLocalTime = (
  secs: any,
  zone = "UTF-8",
  format = "cccc, dd LLL yyyy'"
) => DateTime.fromSeconds(secs).setZone("UTC-3").toFormat(format);
//DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
const iconUrlFromCode = (code: any) => {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
};
export default getFormatedWeatherData;
export { iconUrlFromCode, formatToLocalTime };
