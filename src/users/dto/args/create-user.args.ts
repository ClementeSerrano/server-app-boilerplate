import { Field, ArgsType } from '@nestjs/graphql';

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

  @Field(() => [String], { nullable: true })
  preferences?: string[];
}
