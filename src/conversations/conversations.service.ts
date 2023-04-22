import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { OpenAIService } from '../openai/openai.service';
import { Conversation } from './schemas/conversation.schema';
import { CreateConversationDto } from './conversations.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
    private openaiService: OpenAIService,
  ) {}

  public async create(
    createConversationDto: CreateConversationDto,
  ): Promise<string> {
    const prompt = createConversationDto.prompt;

    const prevConversations = await this.conversationModel.find().exec();

    console.log({ prevConversations });

    const response = await this.openaiService.createChatCompletion(prompt);

    return response;
  }
}
