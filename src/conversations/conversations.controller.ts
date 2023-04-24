import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { ChatDto } from './dto/chat.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @HttpCode(200)
  chat(
    @Body() chatDto: ChatDto,
  ): Promise<{ response: string; conversationId: string }> {
    return this.conversationsService.chat(chatDto);
  }
}
