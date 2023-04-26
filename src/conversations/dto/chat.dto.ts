import { ArgsType, Field } from '@nestjs/graphql';

export class ChatDto {
  userId: string;
  conversationId?: string;
  prompt: string;
}

@ArgsType()
export class ChatArgs {
  @Field((type) => String)
  userId: string;

  @Field((type) => String, { nullable: true })
  conversationId?: string;

  @Field((type) => String)
  prompt: string;
}
