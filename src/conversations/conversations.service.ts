import { Injectable } from '@nestjs/common';

import { CreateConversationDto } from './conversations.dto';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class ConversationsService {
  constructor(private openaiService: OpenAIService) {}

  public async createConversation(
    params: CreateConversationDto,
  ): Promise<string> {
    const prompt = params.prompt;

    const response = await this.openaiService.createChatCompletion(prompt);

    // Return response
    return response;
  }
}
