import { ForbiddenException, Injectable, UnauthorizedException, UnprocessableEntityException, UseFilters } from '@nestjs/common';
import { registerUserDto, loginUserDto, UserFromDBdto } from './common/dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/common/entities/User.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Tokens } from './common/interfaces';
import { AuthenticationService } from './authentication';
import { HttpExceptionFilter } from './common/guards/error.handlers/error.filter';

// TODO: Add tokens to function returns
// add rToken to db
// add token guards

@Injectable()
export class UsersService {

  constructor(@InjectModel('userModel') private userModel: Model<User>, private authService: AuthenticationService) { }

  async register(registerUserDto: registerUserDto) {
  
      // check if email exists
      const emailExists: UserFromDBdto = await this.userModel.findOne({ email: registerUserDto.email })
      if (emailExists) throw new ForbiddenException('Email is already registered');


      // check if username taken
      const usernameTaken: UserFromDBdto = await this.userModel.findOne({ username: registerUserDto.username })
      if (usernameTaken) throw new ForbiddenException('Username is already in use');


      //hash password

      const hash = await argon.hash(registerUserDto.password)
      registerUserDto.password = hash;
      registerUserDto.rTokenHash = null;
      registerUserDto.role = 'User'

      // create user
      const newUser = await this.userModel.create(registerUserDto)



      // make tokens _id may cause typing problems. handle if they occur
      const tokens = await this.authService.getTokens(newUser._id, newUser.email);
      await this.updateRtHash(newUser._id, tokens.refresh_token);

      tokens.role = newUser.role 

      console.log('registerd');
      return tokens




  }

  async login(loginUserDto: loginUserDto) {
    
      // get user
      const user: UserFromDBdto = await this.userModel.findOne({ email: loginUserDto.email })
      if (!user) throw new ForbiddenException('User does not exist or is invalid!')


      // check password
      const passwordCheck = await argon.verify(user.password, loginUserDto.password)
      
      if (!passwordCheck) throw new ForbiddenException('Incorrect password!')
      
      // make tokens
      const tokens = await this.authService.getTokens(user._id, user.email);

      await this.updateRtHash(user._id, tokens.refresh_token);

      console.log('logged in');
      tokens.role = user.role 

      return tokens


    
  }

  async logout(userId: mongoose.Types.ObjectId) {

    
      // findByIdandUpdate is not working because id is string it wants mongodb.ObjectId
      // find user and remove rToken
      const logoutUser = this.userModel.findByIdAndUpdate({ _id: userId }, { rTokenHash: null }).exec()
      if (!logoutUser) throw new ForbiddenException('Something went wrong');

      return { message: 'logged out' }
    
  }

  async updateRtHash(userId: mongoose.Types.ObjectId, rToken: string): Promise<void> {
    
      //hash token
      const hash = await argon.hash(rToken);
      // update DB
      console.log(hash);

      console.log(userId);

      await this.userModel.findByIdAndUpdate({ _id: userId }, { rTokenHash: hash })

  

  }

  async refreshTokens(userId: string, rToken: string): Promise<Tokens> {

  
      // get user

      const user = await this.userModel.findById(userId)
      console.log(['user ok', user]);


      if (!user) { throw new ForbiddenException('Access Denied - No such User found'); }

      if (!user.rTokenHash) { throw new UnprocessableEntityException('Access Denied - No token info in database'); }


      // check refresh token
      const rTokenMatch = await argon.verify(user.rTokenHash, rToken)
      if (!rTokenMatch) { throw new UnprocessableEntityException('Access Denied - token is invalid'); }


      // get new tokens
      const tokens = await this.authService.getTokens(userId, user.email);
      await this.updateRtHash(user._id, tokens.refresh_token);


      tokens.role = user.role 

      return tokens;



  }

}
