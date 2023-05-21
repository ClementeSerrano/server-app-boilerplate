import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

enum ConversationUserRole {
  'system' = 'system',
  'user' = 'user',
  'assistant' = 'assistant',
}

registerEnumType(ConversationUserRole, {
  name: 'ConversationUserRole',
});

@ObjectType({ description: 'Message object type.' })
export class Message {
  @Field(() => ID)
  _id: string;

  @Field(() => ConversationUserRole)
  role: ConversationUserRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => String)
  content: string;
}
