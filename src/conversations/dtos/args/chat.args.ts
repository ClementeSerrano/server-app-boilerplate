import { ArgsType, Field } from '@nestjs/graphql';
import { LocationInput } from 'src/location/dtos/inputs/location.input';

@ArgsType()
export class ChatArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  conversationId?: string;

  @Field(() => String)
  prompt: string;

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput;
}
