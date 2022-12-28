/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param, Put, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AccountDto, PhoneNumberDto, TransferDto } from './account-dto';
import { AccountService } from './account.service';
import { Response } from 'express';

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

    @Get('/findbyphone')
    findAccount( @Body() phoneNumberDto: PhoneNumberDto) {
        return this.accService.findAccountByPhonenumber(phoneNumberDto.phoneNumber)

        // if(!found){
        //     return res.status(HttpStatus.BAD_REQUEST).send()
        // }
        // else return found
    }
    
    @Put()
    transferBalance(@Body() transactionDto: TransferDto){
        return this.accService.transferMoney(transactionDto)
    }
}