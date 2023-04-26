import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

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

enum ConversationUserRole {
  'system',
  'user',
  'assistant',
}

registerEnumType(ConversationUserRole, {
  name: 'ConversationUserRole',
});
