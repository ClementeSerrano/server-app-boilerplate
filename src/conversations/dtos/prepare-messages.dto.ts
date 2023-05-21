import { Message } from '../schemas/message.schema';
import { LocationContext } from 'src/location/interfaces/location-context.interface';

export class PrepareMessagesDto {
  conversationMessages: Message[] | null;
  userPreferences: string[];
  locationContext?: LocationContext;
}
