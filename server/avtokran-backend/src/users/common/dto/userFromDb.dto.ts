import { IsEmail, IsNotEmpty, IsString, } from "class-validator";
import mongoose from "mongoose";

export class UserFromDBdto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    rTokenHash: string;

    @IsString()//if not remove
    _id: mongoose.Types.ObjectId

    role?: string;
}
