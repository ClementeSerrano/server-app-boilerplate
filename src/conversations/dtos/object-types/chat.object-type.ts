import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Chat response object type.' })
export class ChatResponse {
  @Field(() => ID)
  conversationId: string;

  @Field(() => String)
  response: string;
}
