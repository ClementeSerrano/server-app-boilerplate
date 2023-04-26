import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/users.schema';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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

  public async findPreferences(_id: string): Promise<string[] | null> {
    const user = await this.userModel.findById(_id).exec();
    return user?.preferences || null;
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
