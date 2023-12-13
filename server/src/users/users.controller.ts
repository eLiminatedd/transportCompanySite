import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { registerUserDto } from './common/dto/register-user.dto';
import { loginUserDto } from './common/dto';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RtGuard } from './common/guards/rt.guard';
import mongoose from 'mongoose';
import { Tokens } from './common/interfaces';
import { HttpExceptionFilter } from './common/guards/error.handlers/error.filter';

// TODO
// decide how to set cookies right now it only returns tokens
// tokens are recieved from headers and requiere this format - Authorization:Bearer _Token_. 
// The whitespace is important
@Controller('users')
@UseFilters(new HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: registerUserDto) {
    try {
      console.log(dto);
      
      return this.usersService.register(dto);
    } catch (error) {
      throw error
    }
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: loginUserDto) {
    try {
      return await this.usersService.login(dto);
    } catch (error) {
      throw error
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: mongoose.Types.ObjectId) {
    try {
      console.log('logged out >>>>' + userId);
      
      return this.usersService.logout(userId);
    } catch (error) {
      throw error
    }
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: mongoose.Types.ObjectId | string,
    @GetCurrentUser('refreshToken') rToken: string): Promise<Tokens> {
    try {
      return this.usersService.refreshTokens(userId as string, rToken);
    } catch (error) {

      throw error
    }
  }

}
