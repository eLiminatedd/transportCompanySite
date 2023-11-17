import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpCode, HttpStatus } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto, UpdateContractDto_noTs } from './dto/update-contract.dto';
import { HttpExceptionFilter } from 'src/users/common/guards/error.handlers/error.filter';
import { GetCurrentUserId } from 'src/users/common/decorators';
import mongoose from 'mongoose';

@Controller('contracts')
@UseFilters(new HttpExceptionFilter)
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetCurrentUserId() userId: mongoose.Types.ObjectId,
    @Body() createContractDto: CreateContractDto) {
    try {
      console.log(userId, 'from controller');
      
      console.log(createContractDto);
      
      return this.contractsService.create(createContractDto, userId);
    } catch (error) {
      throw error
    }
  }

  @Get('current')
  @HttpCode(HttpStatus.OK)
  async findCurrent() {
    try {
      
      return this.contractsService.findCurrent();
    } catch (error) {
      throw error
    }
  }


  @Get('own')
  @HttpCode(HttpStatus.OK)
  async findOwned(@GetCurrentUserId() userId: mongoose.Types.ObjectId,) {
    try {
      
      return this.contractsService.findOwned(userId);
    } catch (error) {
      throw error
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {
      
      return this.contractsService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      
      return this.contractsService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto_noTs | UpdateContractDto ) {
    try {
      console.log(updateContractDto, 'from patch contract');
      
      return this.contractsService.update(id, updateContractDto);
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    try {
      
      return this.contractsService.remove(id);
    } catch (error) {
      throw error
    }
  }
}
