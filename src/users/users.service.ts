import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './user.dto';
import { User } from './users.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async findById(_id: string): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async findByAnonUserId(anonUserId: string): Promise<User | null> {
    return this.userModel.findOne({ anonUserId }).exec();
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async createAnonUser(anonUserId: string): Promise<User> {
    const createdUser = new this.userModel({ anonUserId });
    return createdUser.save();
  }
}
