import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Testimonial } from './entities/testimonial.entity';

@Injectable()
export class TestimonialsService {

  constructor(@InjectModel('testimonialModel') private testimonialModel: Model<Testimonial>, ) { }


  async create(createTestimonialDto: CreateTestimonialDto, userId:mongoose.Types.ObjectId) {
    createTestimonialDto.owner = userId;
    const testimonial = await this.testimonialModel.create(createTestimonialDto)
    if (!testimonial) {
      throw new NotFoundException('Unsuccesfull creation')
    }

    return testimonial;
  }

  async findAll() {
    const testimonials = await this.testimonialModel.find().lean();

    if (!testimonials) {
      throw new NotFoundException('Not found')
    }
    return testimonials
  }

  async findOne(id: string) {
    const testimonial = await this.testimonialModel.findById(id).lean();
    if (!testimonial) {
      throw new NotFoundException('Not found')
    }
    return testimonial
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto) {
    const testimonial = await this.testimonialModel.findByIdAndUpdate(id, updateTestimonialDto).lean();
    if (!testimonial) {
      throw new NotFoundException('Unsuccesfull update')
    }
    return testimonial
  }

  async remove(id: string) {
    const testimonial = await this.testimonialModel.findByIdAndDelete(id).lean();
    if (!testimonial) {
      throw new NotFoundException('Unsuccesfull delete?')
    }
    return testimonial
  }
}
