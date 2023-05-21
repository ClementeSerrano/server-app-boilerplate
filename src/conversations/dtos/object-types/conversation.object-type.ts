import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/dto/object-types/user.object-type';
import { Message } from './message.object-type';

@ObjectType({ description: 'Conversation object type.' })
export class Conversation {
  @Field(() => ID)
  _id: string;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Message])
  messages: Message[];
}
