import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';

import { ActivityChatType } from 'src/conversations/interfaces/activity-chat.interfaces';
import { LocationInput } from 'src/location/dtos/inputs/location.input';

registerEnumType(ActivityChatType, {
  name: 'ActivityChatType',
});

@ArgsType()
export class ActivityChatArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  conversationId?: string;

  @Field(() => ActivityChatType)
  activityType: ActivityChatType;

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput;
}
