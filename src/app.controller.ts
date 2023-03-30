import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateAppDto } from './app.dto';
import { AppService } from './app.service';

@Controller('apps')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(201)
  createApp(@Body() createAppDto: CreateAppDto): Promise<CreateAppDto> {
    return this.appService.createApp(createAppDto);
  }
}
