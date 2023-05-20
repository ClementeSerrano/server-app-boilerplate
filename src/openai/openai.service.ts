import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

import {
  CHAT_COMPLETION_BASE_CONFIG,
  CHAT_SYSTEM_BASE_MESSAGE,
} from './openai.constants';
import { ChatCompletionModel } from './interfaces/openai.interfaces';

@Injectable()
export class OpenAIService {
  private apiClient: OpenAIApi;
  private model: ChatCompletionModel;

  constructor(private configService: ConfigService) {
    const config = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    this.model = this.configService.get<ChatCompletionModel>(
      'OPENAI_CHAT_COMPLETION_MODEL',
    );

    this.apiClient = new OpenAIApi(config);
  }

  /**
   * Generates a chat completion based on a given prompt and previous messages.
   * @returns The generated chat completion.
   */
  public async createChatCompletion(
    prompt: string,
    messages: ChatCompletionRequestMessage[],
  ): Promise<string> {
    try {
      const result = await this.apiClient.createChatCompletion({
        ...CHAT_COMPLETION_BASE_CONFIG,
        model: this.model,
        messages: [
          { role: 'system', content: this.generateChatSystemMessage() },
          ...messages,
          { role: 'user', content: prompt },
        ],
      });

      const completion = result.data.choices[0].message?.content;

      return completion;
    } catch (error) {
      throw new HttpException(
        error.response.data.error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Generates the base system message for a chat completion call.
   */
  private generateChatSystemMessage(): string {
    // TODO: Add Knowledge cutoff: ${knowledge_cutoff}
    return (
      CHAT_SYSTEM_BASE_MESSAGE +
      ` Current date: ${new Date().toLocaleString('en-US')}`
    );
  }
}
