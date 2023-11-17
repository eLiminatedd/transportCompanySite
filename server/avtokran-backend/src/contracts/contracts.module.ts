import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { ContractSchema } from './entities/contract.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: "contractModel", schema: ContractSchema }])],

  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule {}
