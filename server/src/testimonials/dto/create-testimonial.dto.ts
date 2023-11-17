import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateTestimonialDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    objective: string;

    @IsNumber()
    @IsNotEmpty()
    weightTons: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    status: string;

    owner: mongoose.Types.ObjectId

    @IsString()
    contract: string
}

