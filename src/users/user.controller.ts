import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './user.dto';
import { User } from './users.schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':_id')
  @HttpCode(200)
  findById(@Param('_id') _id: string): Promise<User> {
    return this.userService.findById(_id);
  }

  @Post()
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
