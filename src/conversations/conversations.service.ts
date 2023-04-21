import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateConversationDto } from './conversations.dto';
import { OpenAIService } from '../openai/openai.service';
import { Conversation } from './schemas/conversation.schema';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
    private openaiService: OpenAIService,
  ) {}

  public async createConversation(
    params: CreateConversationDto,
  ): Promise<string> {
    const prompt = params.prompt;

    const prevConversations = await this.conversationModel.find().exec();

    console.log({ prevConversations });

    const response = await this.openaiService.createChatCompletion(prompt);

    // Return response
    return response;
  }
}
