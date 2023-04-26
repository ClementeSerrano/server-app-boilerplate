import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { UserController } from './user.controller';
import { UserService } from './users.service';
import { User, UserSchema } from './schemas/users.schema';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // controllers: [UserController],
  providers: [UsersResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
