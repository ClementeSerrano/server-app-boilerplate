import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/dto/object-types/user.object-type';

@ObjectType({ description: 'Auth profile' })
export class AuthProfile extends User {
  @Field(() => String)
  userId: string;
}
