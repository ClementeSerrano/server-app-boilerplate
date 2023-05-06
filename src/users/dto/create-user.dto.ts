import { PartialType, PickType } from '@nestjs/mapped-types';
import { Field, ArgsType } from '@nestjs/graphql';

import { User } from '../schemas/users.schema';

export class CreateUserDto extends PartialType(
  PickType(User, ['password', 'firstname', 'lastname', 'preferences']),
) {
  username: string;
  isAnonymous: boolean;
}

@ArgsType()
export class CreateUserArgs {
  @Field()
  username: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field((type) => [String], { nullable: true })
  preferences?: string[];
}
