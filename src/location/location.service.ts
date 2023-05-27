import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import {
  Client as GoogleMapsClient,
  Status as GoogleMapsResponseStatus,
  AddressType as GoogleMapsAddressType,
} from '@googlemaps/google-maps-services-js';

import { LocationContext } from './interfaces/location-context.interface';
import { GetLocationContextDto } from './dtos/get-location-context.dto';
import { OpenWeatherResponse } from './dtos/openweather-response.dto';
import { Geocode } from './interfaces/geocode.interface';
import { Weather } from './interfaces/weather.interface';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class LocationService {
  private readonly openWeatherApiKey: string;
  private readonly googleMapsApiKey: string;
  private readonly googleMapsClient: GoogleMapsClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.openWeatherApiKey = this.configService.get<string>(
      'OPENWEATHER_API_KEY',
    );
    this.googleMapsApiKey = this.configService.get<string>(
      'GOOGLE_MAPS_API_KEY',
    );

    this.googleMapsClient = new GoogleMapsClient({});
  }

  public async getLocationContext(
    getLocationContextDto: GetLocationContextDto,
  ): Promise<LocationContext> {
    const { latitude, longitude } = getLocationContextDto;

    const [geocodeResponse, weatherResponse, localTimeResponse] =
      await Promise.all([
        this.getGeocodeData(latitude, longitude),
        this.getWeatherData(latitude, longitude),
        this.getLocalTime(latitude, longitude),
      ]);

    const { country, city, suburb, street, houseNumber } = geocodeResponse;
    const weather = weatherResponse;
    const localTime = localTimeResponse;

    return {
      country,
      city,
      suburb,
      street,
      houseNumber,
      localTime,
      weather,
    };
  }

  private async getGeocodeData(
    latitude: number,
    longitude: number,
  ): Promise<Geocode> {
    try {
      const response = await this.googleMapsClient.reverseGeocode({
        params: {
          latlng: { latitude, longitude },
          key: this.googleMapsApiKey,
        },
        timeout: 1000,
      });

      const components = response.data.results[0].address_components;

      const countryComponent = components.find((c) =>
        c.types.includes(GoogleMapsAddressType.country),
      );
      const cityComponent = components.find((c) =>
        c.types.includes(GoogleMapsAddressType.locality),
      );
      const suburbComponent = components.find((c) =>
        c.types.includes(GoogleMapsAddressType.sublocality),
      );
      const streetComponent = components.find((c) =>
        c.types.includes(GoogleMapsAddressType.route),
      );
      const houseNumberComponent = components.find((c) =>
        c.types.includes(GoogleMapsAddressType.street_number),
      );

      return {
        country: countryComponent?.long_name,
        city: cityComponent?.long_name,
        suburb: suburbComponent?.long_name,
        street: streetComponent?.long_name,
        houseNumber: houseNumberComponent?.long_name,
      };
    } catch (err) {
      throw `Error fetching geocode info for latitude: ${latitude}, longitude: ${longitude}. Error: ${JSON.stringify(
        (err as AxiosError).response?.data,
      )}.`;
    }
  }

  private async getWeatherData(
    latitude: number,
    longitude: number,
  ): Promise<Weather> {
    const requestUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&exclude=alerts,hourly,daily,minutely&appid=${this.openWeatherApiKey}`;

    const { data } = await firstValueFrom<{ data: OpenWeatherResponse }>(
      this.httpService.get<OpenWeatherResponse>(requestUrl).pipe(
        catchError((error: AxiosError) => {
          // this.logger.error(error.response.data);
          throw `Error fetching the weather conditions for latitude: ${latitude}, longitude: ${longitude}. Error: ${JSON.stringify(
            error.response?.data,
          )}.`;
        }),
      ),
    );

    return {
      description: data.weather[0].description,
      temp: data.main.temp,
      tempFeelsLike: data.main.feels_like,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      windSpeed: data.wind.speed,
      cloudiness: data.clouds.all,
    };
  }

  private async getLocalTime(
    latitude: number,
    longitude: number,
  ): Promise<string> {
    const params = {
      key: this.googleMapsApiKey,
      location: `${latitude},${longitude}`,
      timestamp: Math.floor(new Date().getTime() / 1000), // current timestamp in seconds
    };

    try {
      const response = await this.googleMapsClient.timezone({
        params,
        timeout: 1000,
      });

      if (response.data.status === GoogleMapsResponseStatus.OK) {
        const timeZoneId = response.data.timeZoneId;
        const localTime = dayjs()
          .tz(timeZoneId)
          .format('MMMM D, YYYY - h:mm A');

        return localTime;
      } else {
        throw new Error(
          `Error fetching local time for ${params.location}. Response status: ${response.data.status}`,
        );
      }
    } catch (err) {
      throw err;
    }
  }
}
