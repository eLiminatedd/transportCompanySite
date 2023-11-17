import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto, UpdateContractDto_noTs } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContractsService {

  constructor(@InjectModel('contractModel') private contractModel: Model<Contract>) { }

  async create(createContractDto: CreateContractDto, userId: mongoose.Types.ObjectId) {
    createContractDto.owner = userId;
    const contract = await this.contractModel.create(createContractDto);
    if (!contract) {
      throw new NotFoundException('Unsuccesfull creation')
    }
    return contract
  }

  async findAll() {
    const contracts = await this.contractModel.find().lean();
    if (!contracts) {
      throw new NotFoundException('Not found')
    }
    return contracts
  }

  
  async findCurrent() {
    const contracts = await this.contractModel.find({status: { $not: {$regex: 'reviewed'}}} ).lean();
    if (!contracts) {
      throw new NotFoundException('Not found')
    }
    return contracts
  }


  async findOwned(userId: mongoose.Types.ObjectId) {
    const contracts = await this.contractModel.find({owner: userId} ).lean();
    if (!contracts) {
      throw new NotFoundException('Not found')
    }
    return contracts
  }

  async findOne(id: string) {
    const contract = await this.contractModel.findById(id).lean();
    if (!contract) {
      throw new NotFoundException('Not found')
    }
    return contract
  }

  async update(id: string, updateContractDto: UpdateContractDto | UpdateContractDto_noTs) {
    const contract = await this.contractModel.findByIdAndUpdate(id, updateContractDto).lean();
    if (!contract) {
      throw new NotFoundException('Unsuccesfull update')
    }
    return contract
  }

  async remove(id: string) {
    const contract = await this.contractModel.findByIdAndDelete(id).lean();
    if (!contract) {
      throw new NotFoundException('Unsuccesfull delete?')
    }
    return contract
  }
}
