/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AccountDto } from './account-dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(
        private accService: AccountService
    ){
    }

    @Post(':id')
    putAcc(@Param('id') id: string, @Body() accDto: AccountDto){
        return this.accService.bindAcc(id, accDto)
    }
}