import { Module } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsController } from './testimonials.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestimonialSchema } from './entities/testimonial.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: "testimonialModel", schema: TestimonialSchema }]), ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService,]
})
export class TestimonialsModule { }
