import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayloadRefreshToken } from "../interfaces";


export const GetCurrentUser = createParamDecorator(
    (_data: keyof JwtPayloadRefreshToken | undefined, context: ExecutionContext) => {

        const request = context.switchToHttp().getRequest();
        // console.log(['from getUser', request]);

        if (_data) {
            const refreshHash = request.rawHeaders
                .find((header: string) => header.startsWith('Bearer'))
                .replace('Bearer', '')
                .trim();


            return refreshHash
        }
        // either returns hash from headers or user from headers
        return request.user
    }

);