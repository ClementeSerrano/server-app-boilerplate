import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/users.schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':_id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('_id') _id: string): Promise<User> {
    return this.userService.findById(_id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
