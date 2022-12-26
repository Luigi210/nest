/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  JwtService
} from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthDto } from './auth-dto';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async register(authDto: AuthDto){
        const found = await this.userModel.findOne({
            phoneNumber: authDto.phoneNumber
        })

        return this.userModel.findByIdAndUpdate(found._id, {
            $set: {
                'password':  this.hashPassword(authDto.password)
            }
        })
    }

    async hashPassword(password: string){
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePassword(password: string, hash) {
        return await bcrypt.compare(password, hash)
    }


    async login(user: AuthDto) {

        const found = await this.userModel.findOne({
            phoneNumber: user.phoneNumber
        })

        if((await this.comparePassword(user.password, found.password))){

            const payload = {
                username: found.firstName,
                email: found.email
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }

        return {
            error: 'Passwords are not the same'
        }
  }
}
