import { JwtPayload } from "./jwtPayload.interface";

export interface JwtPayloadRefreshToken extends JwtPayload {
    refreshToken: string,
}