import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async findOne(findUserDto: FindUserDto): Promise<User | null> {
    return this.userModel.findOne(findUserDto);
  }

  public async findById(_id: string): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
