import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../users.schema';

export class CreateUserDto extends PartialType(
  PickType(User, [
    'username',
    'password',
    'firstname',
    'lastname',
    'preferences',
  ]),
) {}
