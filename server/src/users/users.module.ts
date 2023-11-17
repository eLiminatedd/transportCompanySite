import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/common/entities/User.schema';
import { AuthTokenStrategy, RefreshTokenStrategy, AuthenticationService } from './authentication';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: "userModel", schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, AuthTokenStrategy, RefreshTokenStrategy, AuthenticationService, JwtService,]
})
export class UsersModule { }
