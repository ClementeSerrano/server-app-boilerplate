import { Message } from '../schemas/message.schema';
import { Location } from 'src/location/interfaces/location.interface';

export class PrepareMessagesDto {
  conversationMessages: Message[] | null;
  userPreferences: string[];
  userLocation?: Location;
}
