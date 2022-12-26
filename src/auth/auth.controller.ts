/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authSerivce: AuthService
    ){}

    @Post('/login')
    login(@Body() authDto: AuthDto){
        // return this.authSerivce.login(authDto)
        return {authDto}
    }

    @Post('/register')
    regis(@Body() authDto: AuthDto){
        // return this.authSerivce.register(authDto)
        return authDto
    }
    // @Post()
}
