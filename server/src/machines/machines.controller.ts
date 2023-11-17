import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpCode, HttpStatus } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { HttpExceptionFilter } from 'src/users/common/guards/error.handlers/error.filter';
import { Public } from 'src/users/common/decorators';

@Controller('machines')
@UseFilters(new HttpExceptionFilter)

export class MachinesController {
  constructor(private readonly machinesService: MachinesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMachineDto: CreateMachineDto) {
    try {
      console.log(createMachineDto);
      
      return this.machinesService.create(createMachineDto);
    } catch (error) {
      throw error
    }
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {

      return this.machinesService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {
      
      return this.machinesService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    try {
      
      return this.machinesService.update(id, updateMachineDto);
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    try {
      
      return this.machinesService.remove(id);
    } catch (error) {
      throw error
    }
  }
}