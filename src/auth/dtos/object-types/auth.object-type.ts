import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'auth' })
export class Auth {
  @Field((type) => String)
  accessToken: string;
}
