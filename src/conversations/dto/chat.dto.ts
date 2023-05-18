import { ArgsType, Field } from '@nestjs/graphql';

import { Location } from 'src/location/location.types';
import { LocationInput } from 'src/location/schemas/location-input.gql.schema';

export class ChatDto {
  userId: string;
  conversationId?: string;
  prompt: string;
  location?: Location;
}

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
