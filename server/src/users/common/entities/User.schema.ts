import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({
        required: [true, 'Username is required'],
        unique: true,
    })
    username: string;

    @Prop({
        required: [true, 'Email is required'],
        unique: true
    })
    email: string;

    @Prop({
        required: [true, 'Password is required'],
    })
    password: string;

    @Prop()
    rTokenHash?: string;

    @Prop()
    role?: string;

    @Prop()
    admin?: boolean | null;

}

export const UserSchema = SchemaFactory.createForClass(User)