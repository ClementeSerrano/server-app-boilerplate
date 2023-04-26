import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/schemas/users.gql.schema';
import { Message } from './message.gql.schema';

@ObjectType({ description: 'conversation' })
export class Conversation {
  @Field((type) => ID)
  _id: string;

  @Field((type) => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field((type) => [Message])
  messages: Message[];
}
