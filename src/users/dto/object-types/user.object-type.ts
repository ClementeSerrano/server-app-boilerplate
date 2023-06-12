import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AuthType } from 'src/auth/dtos/object-types/auth-profile.object-type';

@ObjectType({ description: 'User object type.' })
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  firstname?: string;

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
}
