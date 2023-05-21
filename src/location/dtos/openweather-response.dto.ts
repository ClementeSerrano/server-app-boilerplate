export type OpenWeatherResponse = {
  coord: OpenWeatherCoord;
  weather: OpenWeatherWeather[];
  base: string;
  main: OpenWeatherMain;
  visibility: number;
  wind: OpenWeatherWind;
  clouds: OpenWeatherClouds;
  rain?: OpenWeatherRain;
  snow?: OpenWeatherSnow;
  dt: number;
  sys: OpenWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type OpenWeatherCoord = {
  lon: number;
  lat: number;
};

type OpenWeatherWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type OpenWeatherMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type OpenWeatherWind = {
  speed: number;
  deg: number;
  gust?: number;
};

type OpenWeatherClouds = {
  all: number;
};

type OpenWeatherRain = {
  '1h'?: number;
  '3h'?: number;
};

type OpenWeatherSnow = {
  '1h'?: number;
  '3h'?: number;
};

type OpenWeatherSys = {
  type: number;
  id: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
};
