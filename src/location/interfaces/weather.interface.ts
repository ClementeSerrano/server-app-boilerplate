export type Weather = {
  description: string;
  temp: number; // in Celsius.
  tempFeelsLike: number; // in Celsius.
  tempMax: number; // in Celsius.
  tempMin: number; // in Celsius.
  windSpeed: number; // in meters/second.
  cloudiness: number; // in %
  // TODO: Add sunrise and sunset (as date).
};
