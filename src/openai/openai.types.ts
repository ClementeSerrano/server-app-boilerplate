import { CreateChatCompletionRequest } from 'openai';

export type ChatCompletionBaseConfig = Pick<
  CreateChatCompletionRequest,
  | 'model'
  | 'temperature'
  | 'max_tokens'
  | 'top_p'
  | 'model'
  | 'frequency_penalty'
  | 'presence_penalty'
>;
