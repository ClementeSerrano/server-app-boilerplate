import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateAppDto } from './apps.dto';
import { AppsService } from './apps.service';

@Controller('apps')
export class AppsController {
  constructor(private readonly appService: AppsService) {}

  @Post()
  @HttpCode(201)
  createApp(@Body() createAppDto: CreateAppDto): Promise<CreateAppDto> {
    return this.appService.createApp(createAppDto);
  }
}
