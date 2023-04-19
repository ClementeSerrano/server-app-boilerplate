import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

import {
  CHAT_COMPLETION_BASE_CONFIG,
  CHAT_SYSTEM_BASE_MESSAGE,
} from './openai.constants';

@Injectable()
export class OpenAIService {
  private apiClient: OpenAIApi;

  constructor(private configService: ConfigService) {
    const config = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    this.apiClient = new OpenAIApi(config);
  }

  /**
   * Generates code completion based on a given prompt.
   * @param prompt - The prompt to generate code completion.
   * @returns A Promise that resolves to the generated code completion.
   */
  public async createChatCompletion(prompt: string): Promise<string> {
    try {
      const result = await this.apiClient.createChatCompletion({
        ...CHAT_COMPLETION_BASE_CONFIG,
        messages: [
          { role: 'system', content: this.generateChatSystemMessage() },
          { role: 'user', content: prompt },
        ],
        // TODO: Add user field.
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
      `Current date: ${new Date().toLocaleString('en-US')}`
    );
  }
}
