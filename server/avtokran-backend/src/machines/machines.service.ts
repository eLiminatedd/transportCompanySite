import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machine } from './entities/machine.entity';

@Injectable()
export class MachinesService {

  constructor(@InjectModel('machineModel') private machineModel: Model<Machine>) { }

  async create(createMachineDto: CreateMachineDto,) {
    const machine = await this.machineModel.create(createMachineDto)
    if (!machine) {
      throw new NotFoundException('Unsuccesfull creation')
    }
    return machine;
  }

  async findAll() {
    const machines = await this.machineModel.find().lean();
    if (!machines) {
      throw new NotFoundException('Not found')
    }
    return machines
  }

  async findOne(id: string) {
    const machine = await this.machineModel.findById(id).lean();
    if (!machine) {
      throw new NotFoundException('Not found')
    }
    return machine
  }

  async update(id: string, updateMachineDto: UpdateMachineDto) {
    const machine = await this.machineModel.findByIdAndUpdate(id, updateMachineDto).lean();
    if (!machine) {
      throw new NotFoundException('Unsuccesfull update?')
    }
    return machine
  }

  async remove(id: string) {
    const machine = await this.machineModel.findByIdAndDelete(id).lean();
    if (!machine) {
      throw new NotFoundException('Unsuccesfull delete?')
    }
    return machine
  }
}
