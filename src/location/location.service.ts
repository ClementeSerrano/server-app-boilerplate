import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

import { GetLocationContextDto } from './dtos/get-location-context.dto';
import { OpenCageResponse } from './dtos/opencage-response.dto';
import { LocationContext } from './interfaces/location-context.interface';
import { OpenWeatherResponse } from './dtos/openweather-response.dto';
import { Geocode } from './interfaces/geocode.interface';
import { Weather } from './interfaces/weather.interface';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class LocationService {
  private readonly openCageApiKey: string;
  private readonly openWeatherApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.openCageApiKey = this.configService.get<string>('OPENCAGE_API_KEY');
    this.openWeatherApiKey = this.configService.get<string>(
      'OPENWEATHER_API_KEY',
    );
  }

  public async getLocationContext(
    getLocationContextDto: GetLocationContextDto,
  ): Promise<LocationContext> {
    const { latitude, longitude } = getLocationContextDto;

    const [geocodeResponse, weatherResponse] = await Promise.all([
      this.getGeocodeData(latitude, longitude),
      this.getWeatherData(latitude, longitude),
    ]);

    const { country, city, suburb, street, houseNumber, timezone } =
      geocodeResponse;
    const localTime = await this.getLocalTime(timezone);
    const weather = weatherResponse;

    return {
      country,
      city,
      suburb,
      street,
      houseNumber,
      timezone,
      localTime,
      weather,
    };
  }

  private async getGeocodeData(
    latitude: number,
    longitude: number,
  ): Promise<Geocode> {
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.openCageApiKey}`;

    const { data } = await firstValueFrom<{ data: OpenCageResponse }>(
      this.httpService.get<OpenCageResponse>(requestUrl).pipe(
        catchError((error: AxiosError) => {
          // this.logger.error(error.response.data);
          throw `Error fetching geocode info for latitude: ${latitude}, longitude: ${longitude}. Error: ${JSON.stringify(
            error.response.data,
          )}.`;
        }),
      ),
    );

    return {
      country: data.results[0].components.country,
      city: data.results[0].components.city,
      suburb: data.results[0].components.suburb,
      street: data.results[0].components.road,
      houseNumber: data.results[0].components.house_number,
      timezone: data.results[0].annotations.timezone.name,
    };
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
            error.response.data,
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

  private async getLocalTime(timezone: string): Promise<string> {
    const requestUrl = `http://worldtimeapi.org/api/timezone/${timezone}`;

    const { data } = await firstValueFrom<{ data: { datetime: string } }>(
      this.httpService.get<{ datetime: string }>(requestUrl).pipe(
        catchError((error: AxiosError) => {
          // this.logger.error(error.response.data);
          throw `Error fetching local time info for timezone: ${timezone}. Error: ${JSON.stringify(
            error.response.data,
          )}.`;
        }),
      ),
    );

    const date = dayjs(data.datetime).tz(timezone);
    const formattedDate = date.format('MMMM D, YYYY - h:mm A');

    return formattedDate;
  }
}
