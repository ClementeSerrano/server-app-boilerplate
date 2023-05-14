import { CreateChatCompletionRequest } from 'openai';

export type ChatCompletionModel =
  | 'gpt-4'
  | 'gpt-4-0314'
  | 'gpt-4-32k'
  | 'gpt-4-32k-0314'
  | 'gpt-3.5-turbo'
  | 'gpt-3.5-turbo-0301';

export type ChatCompletionBaseConfig = Pick<
  CreateChatCompletionRequest,
  | 'temperature'
  | 'max_tokens'
  | 'top_p'
  | 'frequency_penalty'
  | 'presence_penalty'
>;
