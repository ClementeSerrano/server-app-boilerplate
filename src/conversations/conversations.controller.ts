import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { CreateConversationDto } from './conversations.dto';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @HttpCode(201)
  createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<string> {
    return this.conversationsService.createConversation(createConversationDto);
  }
}
