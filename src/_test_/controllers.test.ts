import { expect, test, describe } from "vitest";
import {
  KelvinToCelcius,
  getWeatherData,
  formatCurrentWeather,
} from "../Services/controllers";

describe("kelvinToCelcius", () => {
  test("should convert temperatures from Kelvin to Celcius", () => {
    expect(KelvinToCelcius(0)).toBe(-273);
    expect(KelvinToCelcius(300)).toBe(27);
  });
});

describe("getWeatherData", () => {
  test("should get weather data", async () => {
    const data = await getWeatherData("weather", { q: "London" });
    expect(data).toHaveProperty("coord");
  });
  test("should get forecast data", async () => {
    const data = await getWeatherData("forecast", { q: "London" });
    expect(data).toHaveProperty("list");
  });
});

describe("formatCurrentWeather", () => {
  test("should format current weather data", async () => {
    const data = await getWeatherData("weather", { q: "London" });
    const formatedData = formatCurrentWeather(data);
    expect(formatedData).toHaveProperty("name");
    expect(formatedData).toHaveProperty("dt");
    expect(formatedData).toHaveProperty("country");
    expect(formatedData).toHaveProperty("sunrise");
    expect(formatedData).toHaveProperty("sunset");
    expect(formatedData).toHaveProperty("details");
    expect(formatedData).toHaveProperty("icon");
    expect(formatedData).toHaveProperty("speed");
  });
});
