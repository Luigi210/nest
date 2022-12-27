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
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){
    }

    async register(authDto: AuthDto){
        const found = await this.userModel.findOne({
            phoneNumber: authDto.phoneNumber
        })
        return await this.userModel.findByIdAndUpdate(found._id, {
            $set: {
                'password': await this.hashPassword(authDto.password)
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
        console.log(found, await this.comparePassword(user.password, found.password))

        if(!found.password){
            return {
                message: "This man does not have password"
            }
        }
        if(found){
            if((await this.comparePassword(user.password, found.password)) === true){
                console.log("equal")
                const payload = {
                    username: found.firstName,
                    email: found.email
                };
                console.log(payload) 
                return (payload)
            }
        }
        else {
            return {
                message: "No such person"
            }
        }

        return {
            message: 'Not equal'
        }
    }
}
