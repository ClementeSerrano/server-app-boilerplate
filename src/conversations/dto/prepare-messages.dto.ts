import { Message } from '../schemas/message.schema';
import { Location } from 'src/location/location.types';

export class PrepareMessagesDto {
  conversationMessages: Message[] | null;
  userPreferences: string[];
  userLocation?: Location;
}
