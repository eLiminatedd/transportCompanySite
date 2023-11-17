import mongoose from "mongoose";

export interface JwtPayload {
    email: string;
    sub: mongoose.Types.ObjectId | string;
};