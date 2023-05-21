import { Location } from '../interfaces/location.interface';

export type GetLocationContextDto = Pick<Location, 'latitude' | 'longitude'>;
