import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/common/entities/User.schema';

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema()
export class Testimonial {

    @Prop({
        required: [true, 'A name is required!'],
    })
    name: string;

    @Prop({
        required: [true, 'An objective is required!'],
    })
    objective: string;

    @Prop({
        required: [true, 'The weight of the objective is required!'],
    })
    weightTons: number;

    @Prop({
        required: [true, 'A brief paragraph is required!'],
    })
    description: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    owner: User

    @Prop({
        required: [true, 'status error'],
    })
    status: string;


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
    })
    contract?: mongoose.Types.ObjectId;


}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial)