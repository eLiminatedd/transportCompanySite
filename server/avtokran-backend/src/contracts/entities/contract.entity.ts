import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/common/entities/User.schema';

export type ContractDocument = HydratedDocument<Contract>;

@Schema()
export class Contract {
    @Prop({
        required: [true, 'An objective is required'],
        unique: [true, 'Objective must be requested once and be unique']
    })
    objective: string;

    @Prop({
        required: [true, 'The weight of the objective is required'],
    })
    weightTons: number;

    @Prop({
        required: [true, 'The distance in kilometres is required'],
    })
    distanceKM: number;

    @Prop({
        required: [true, 'A date must be provided'],
    })
    whenDateStart: string;

    @Prop({
        required: [true, 'A date must be provided'],
    })
    whenDateEnd: string;

    @Prop({
        required: [true, 'A date must be provided'],
    })
    date: string

    @Prop({
        required: [true, 'A location must be provided'],
    })
    address: string;

    @Prop({
        required: [true, 'A phone must be provided'],
        minlength: [10, 'Atr One should be atleast 10 characters']
    })
    phone: string;

    @Prop({
        required: [true, 'A name must be provided'],
    })
    contactInfo: string;

    @Prop()
    duration?: string;

    @Prop()
    description?: string;

    @Prop()
    machines?: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    owner: mongoose.Types.ObjectId


    @Prop({
        required: [true, 'status error'],
    })
    status: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Testimonial',
    })
    testimonial?: mongoose.Types.ObjectId;

}

export const ContractSchema = SchemaFactory.createForClass(Contract)