import { Geocode } from './geocode.interface';
import { Weather } from './weather.interface';

export type LocationContext = Geocode & {
  localTime: string;
  weather: Weather;
};
