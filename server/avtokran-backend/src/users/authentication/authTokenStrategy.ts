import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../common/interfaces';

@Injectable()
export class AuthTokenStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '*MP&L.{gnWUZ+B3^h2Z/',
        });
    }
    // add type for payload
    validate(payload: JwtPayload) {
        return payload
    }
}