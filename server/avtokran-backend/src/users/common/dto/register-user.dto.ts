import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class registerUserDto {
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
    phone?: string;

    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    companyName?: string;
    
    rTokenHash?: string;

    role?: string;


}
