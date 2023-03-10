/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import {
    jwtConstants
} from '../../constants';

import {
    ExtractJwt,
    Strategy
} from 'passport-jwt';
import {
    PassportStrategy
} from '@nestjs/passport';

@Injectable()
export class JwtService extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username
        };
    }
}