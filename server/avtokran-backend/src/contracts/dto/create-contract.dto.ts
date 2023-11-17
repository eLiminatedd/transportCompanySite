import { IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateContractDto {
    @IsString()
    @IsNotEmpty()
    objective: string;

    @IsNumber()
    @IsNotEmpty()
    weightTons: number;

    @IsNumber()
    @IsNotEmpty()
    distanceKM: number;


    // do i need these?
    @IsString()
    @IsNotEmpty()
    whenDateStart: string;

    @IsString()
    @IsNotEmpty()
    whenDateEnd: string;

    @IsString()
    @IsNotEmpty()
    date: string


    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    contactInfo: string;

    @IsString()
    duration?: string;

    @IsString()
    description?: string;

    @IsString()
    machines?: string;

    @IsString()
    @IsNotEmpty()
    status: string

    owner: mongoose.Types.ObjectId


}
