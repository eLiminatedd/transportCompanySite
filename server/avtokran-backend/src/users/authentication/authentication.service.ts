import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from '../common/interfaces';
import mongoose from 'mongoose';


@Injectable()
export class AuthenticationService {

    constructor(private jwtService: JwtService,) { }


    async getTokens(userId: mongoose.Types.ObjectId | string, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        };

        const [authToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: '*MP&L.{gnWUZ+B3^h2Z/',
                expiresIn: '15m'
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: 'Lmqp)rA38OG|+=7v(`O}',
                expiresIn: '7d'
            }),
        ]);
        return {
            access_token: authToken,
            refresh_token: refreshToken
        }
    }
}
