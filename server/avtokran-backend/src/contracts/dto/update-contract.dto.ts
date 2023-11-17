import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { IsString } from 'class-validator';


export class UpdateContractDto_noTs extends PartialType(CreateContractDto) {

}



export class UpdateContractDto extends PartialType(CreateContractDto) {
    @IsString() 
    testimonial: string
}
