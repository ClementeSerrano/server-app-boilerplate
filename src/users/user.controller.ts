import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { CreateUserDto } from './user.dto';
import { User } from './users.schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
