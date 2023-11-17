import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpStatus, HttpCode } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { HttpExceptionFilter } from 'src/users/common/guards/error.handlers/error.filter';
import { GetCurrentUserId, Public } from 'src/users/common/decorators';
import mongoose from 'mongoose';

@Controller('testimonials')
@UseFilters(new HttpExceptionFilter)
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetCurrentUserId() userId: mongoose.Types.ObjectId,
    @Body() createTestimonialDto: CreateTestimonialDto) {
    try {
      console.log(createTestimonialDto);

      return this.testimonialsService.create(createTestimonialDto, userId);
    } catch (error) {
      throw error
    }
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    try {

      return this.testimonialsService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    try {

      return this.testimonialsService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id') id: string, @Body() updateTestimonialDto: UpdateTestimonialDto) {
    try {

      return this.testimonialsService.update(id, updateTestimonialDto);
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    try {

      return this.testimonialsService.remove(id);
    } catch (error) {
      throw error
    }
  }
}
