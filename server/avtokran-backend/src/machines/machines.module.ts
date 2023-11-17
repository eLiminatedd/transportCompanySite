import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MachineSchema } from './entities/machine.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: "machineModel", schema: MachineSchema }])],

  controllers: [MachinesController],
  providers: [MachinesService]
})
export class MachinesModule {}
