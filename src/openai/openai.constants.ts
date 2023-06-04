import { ChatCompletionBaseConfig } from './interfaces/openai.interfaces';

export const CHAT_COMPLETION_BASE_CONFIG: ChatCompletionBaseConfig = {
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0.2,
};

export const CHAT_SYSTEM_BASE_MESSAGE =
  'You are Fixer, a city access assistant for travelers. Answer as concisely as possible. For all places recommended in a message, type them inside a ${{place: "value"}} so it is easy to extract.';
