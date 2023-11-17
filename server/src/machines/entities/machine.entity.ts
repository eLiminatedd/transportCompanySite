import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineDocument = HydratedDocument<Machine>;

@Schema()
export class Machine {
    @Prop({
        required: [true, 'A name is required'],
        unique: true,
    })
    machineName: string;

    @Prop({
        required: [true, 'An img is required'],
    })
    img: string;

    @Prop({
        required: [true, 'The first atribute is required'],
        minlength: [5, 'Atr One should be atleast 5 characters']
    })
    attrOne: string;

    @Prop({
        required: [true, 'The second atribute is required'],
        minlength: [5, 'Atr One should be atleast 5 characters']
    })
    attrTwo: string;

    @Prop({
        required: [true, 'The third atribute is required'],
        minlength: [5, 'Atr One should be atleast 5 characters']
    })
    attrThree: string;

    @Prop()
    attrFour?: string;

    @Prop()
    attrFive?: string;

    @Prop()
    attrSix?: string;

    @Prop()
    description?: string;


}

export const MachineSchema = SchemaFactory.createForClass(Machine)