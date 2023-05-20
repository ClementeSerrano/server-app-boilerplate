import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'auth-profile' })
export class AuthProfile {
  @Field((type) => String)
  sub: string;

  @Field((type) => Boolean)
  isAnonymous: string;
}
