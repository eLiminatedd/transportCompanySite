import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "../interfaces";
import mongoose from "mongoose";


export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): mongoose.Types.ObjectId | string => {
        const request = context.switchToHttp().getRequest();
        const user = request.user
        return user.sub
    }
);