import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/users/dto/object-types/user.object-type';

export enum AuthType {
  'anonymous' = 'anonymous',
  'oauth2' = 'oauth2',
  'native' = 'native',
}

registerEnumType(AuthType, {
  name: 'AuthType',
});

@ObjectType({ description: 'Auth profile' })
export class AuthProfile {
  @Field(() => String)
  userId: string;

  @Field(() => AuthType)
  authType: AuthType;

  @Field(() => User)
  user: User;
}
