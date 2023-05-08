import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

enum ConversationUserRole {
  'system' = 'system',
  'user' = 'user',
  'assistant' = 'assistant',
}

registerEnumType(ConversationUserRole, {
  name: 'ConversationUserRole',
});

@ObjectType({ description: 'message' })
export class Message {
  @Field((type) => ID)
  _id: string;

  @Field((type) => ConversationUserRole)
  role: ConversationUserRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => String)
  content: string;
}
