import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { CreateConversationDto } from './conversations.dto';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @HttpCode(200)
  create(
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<string> {
    return this.conversationsService.create(createConversationDto);
  }
}
