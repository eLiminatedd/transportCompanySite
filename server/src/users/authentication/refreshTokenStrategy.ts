import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common';
import { JwtPayloadRefreshToken, JwtPayload } from '../common/interfaces';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Lmqp)rA38OG|+=7v(`O}',
            passReqToCallBack: true,
        });
    }
    validate(payload: JwtPayload, req: any): JwtPayloadRefreshToken {
            
        const refreshToken = req //.get('authorization').replace('Bearer', '').trim();
        
        return { ...payload, refreshToken, }
    }
}