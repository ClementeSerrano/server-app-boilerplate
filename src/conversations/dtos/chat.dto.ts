import { Location } from 'src/location/interfaces/location.interface';

export class ChatDto {
  userId: string;
  conversationId?: string;
  prompt: string;
  location?: Location;
}
