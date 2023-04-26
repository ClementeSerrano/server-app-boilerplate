import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../schemas/users.schema';

export class FindUserDto extends PartialType(
  PickType(User, ['firstname', 'lastname', 'username']),
) {}
