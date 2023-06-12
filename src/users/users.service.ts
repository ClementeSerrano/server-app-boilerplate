import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthType } from 'src/auth/interfaces/auth-type.interfaces';

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

  public async findById(
    _id: string,
    authType: AuthType = 'native',
  ): Promise<User> {
    if (authType === 'oauth2') {
      return this.userModel.findOne({ oauthId: _id }).exec();
    }

    return this.userModel.findById(_id).exec();
  }

  public async findPreferences(_id: string): Promise<string[] | null> {
    const user = await this.userModel.findById(_id).exec();
    return user?.preferences || null;
  }

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    let fields = createUserDto;

    if (createUserDto?.password) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      fields = { ...fields, password: hashedPassword };
    }

    const createdUser = new this.userModel(fields);

    return createdUser.save();
  }
}
