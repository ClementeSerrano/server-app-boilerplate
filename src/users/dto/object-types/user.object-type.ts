import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum AuthType {
  'anonymous' = 'anonymous',
  'oauth2' = 'oauth2',
  'native' = 'native',
}

registerEnumType(AuthType, {
  name: 'AuthType',
});

@ObjectType({ description: 'User object type.' })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [String], { nullable: true })
  preferences?: string[];

  @Field(() => AuthType)
  authType: AuthType;

  @Field(() => ID, { nullable: true })
  oauthId?: string;
}
