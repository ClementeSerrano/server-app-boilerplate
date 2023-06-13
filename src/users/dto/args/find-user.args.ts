import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindUserArgs {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;
}
