import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class GptService {
  private client: OpenAIApi;

  constructor(private configService: ConfigService) {
    const config = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    this.client = new OpenAIApi(config);
  }

  public async createCodeCompletion(prompt: string): Promise<string> {
    const result = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a single-file React app in Typescript based on: ${prompt}`,
      max_tokens: 800,
      temperature: 0.5,
    });

    console.log({ result });

    return result.data.choices[0].text;
  }
}
