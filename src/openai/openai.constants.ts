import { ChatCompletionBaseConfig } from './openai.types';

export const CHAT_COMPLETION_BASE_CONFIG: ChatCompletionBaseConfig = {
  model: 'gpt-3.5-turbo',
  temperature: 0.5,
  max_tokens: 500,
  top_p: 0.5,
  frequency_penalty: 0.5,
  presence_penalty: 0.2,
};

export const CHAT_SYSTEM_BASE_MESSAGE =
  'You are Fixer, a city access assistant for travelers. Answer as concisely as possible.';