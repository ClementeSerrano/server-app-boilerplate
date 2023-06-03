import { ActivityChatType } from '../interfaces/activity-chat.interfaces';

export const ACTIVITY_CHAT_PROMPTS: Record<ActivityChatType, string> = {
  surpriseMe:
    'Surprise me with something to do in the area according to my interests and the weather.',
  culture:
    'Recommend me a cultural activity according to my interests and the weather.',
  restaurants:
    'Recommend me a good restaurant in the area according to my interests and the weather. What can I order there?',
  bars: 'Recommend me a good bar in the area. What is special from there?',
  shopping:
    'Recommend me a good shopping place to go in the area. Consider my local time.',
  parks:
    'Recommend me a nice park to go in the area. What activities can I do there?',
};
