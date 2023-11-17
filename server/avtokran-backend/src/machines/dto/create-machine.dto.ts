import { IsNotEmpty, IsString } from "class-validator";

export class CreateMachineDto {
    @IsString()
    @IsNotEmpty()
    machineName: string;

    @IsString()
    @IsNotEmpty()
    img: string;

    @IsString()
    @IsNotEmpty()
    attrOne: string;

    @IsString()
    @IsNotEmpty()
    attrTwo: string;

    @IsString()
    @IsNotEmpty()
    attrThree: string;

    @IsString()
    attrFour?: string;

    @IsString()
    attrFive?: string;

    @IsString()
    attrSix?: string;

    @IsString()
    description?: string;
}
