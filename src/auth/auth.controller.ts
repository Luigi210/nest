/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authSerivce: AuthService,
        private jwtServ: JwtService
    ){}

    @Post('/login')
    async login(@Body() authDto: AuthDto){
        const logged = await this.authSerivce.login(authDto)
        
        if(!("message" in logged)){
            // console.log(logged)
            return {
                access_token: this.jwtServ.sign(logged),
            }
        }
        return logged
    }

    @Post('/register')
    regis(@Body() authDto: AuthDto){
        return this.authSerivce.register(authDto)
        // return authDto
    }
    // @Post()
}
