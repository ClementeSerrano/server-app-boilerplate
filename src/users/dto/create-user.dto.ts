import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../schemas/users.schema';

export class CreateUserDto extends PartialType(
  PickType(User, [
    'username',
    'password',
    'firstname',
    'lastname',
    'preferences',
  ]),
) {}
