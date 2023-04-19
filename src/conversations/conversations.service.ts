import { Injectable } from '@nestjs/common';
// import * as path from 'path';
// import { exec } from 'child_process';
// import { writeFile } from 'fs/promises';

import { CreateConversationDto } from './conversations.dto';
import { OpenAIService } from '../openai/openai.service';
// import { CLIENT_APPS_ROOT_PATH, CLIENT_APPS_SRC_PATH } from './conversations.constants';

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
