import { ActivityChatType } from '../interfaces/activity-chat.interfaces';

export const ACTIVITY_CHAT_PROMPTS: Record<ActivityChatType, string> = {
  surpriseMe:
    'Surprise me with something to do in the area according to my interests and the weather.',
  culture: 'Recommend me attractions/cultural activities in the area.',
  restaurants: 'Recommend me good restaurants in the area.',
  bars: 'Recommend me good bars in the area.',
  shopping: 'Recommend me good shopping places in the area.',
  parks: 'Recommend me nice parks in the area.',
};
