import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

import { CODEGEN_PROMPT_INSTRUCTIONS } from './openai.contants';

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
  public async createCompletion(prompt: string): Promise<string> {
    try {
      const result = await this.apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: this.generatePrompt(prompt),
        temperature: 0,
        max_tokens: 4000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      const completion = result.data.choices[0].text;

      return this.sanitizeCompletion(completion);
    } catch (error) {
      throw new HttpException(
        error.response.data.error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Generates a prompt string by combining the instructions and the given prompt.
   * @param prompt - The prompt to be added to the instructions.
   * @returns A combined prompt string.
   */
  private generatePrompt(prompt: string): string {
    return CODEGEN_PROMPT_INSTRUCTIONS + `\nThe purpose of: ${prompt}`;
  }

  /**
   * Sanitizes the completion result by removing unwanted descriptions.
   * @param completion - The completion result returned by the API.
   * @returns A sanitized completion string.
   */
  private sanitizeCompletion(completion: string): string {
    const separator = 'CODE:';

    const index = completion.indexOf('CODE:');

    if (index === -1) {
      return completion; // If the keyword is not found, return the original string
    }

    return completion.substring(index + separator.length).trim(); // Remove everything before the keyword and trim the result
  }
}
