/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AccountDto, CreateUserDto, UserDto } from './user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(private userSerivce: UserService){}
	@Get()
	getUser() {
		return this.userSerivce.getAllUsers();
	}

	@Get(':id') 
	getUserById(@Param('id') id: string) {
		return this.userSerivce.getUser(id)
	}

	@Post(':id/account')
	putAccount(@Param('id') id: string, @Body() accountDto: AccountDto){
		console.log(accountDto)
		return this.userSerivce.createUserAccount(id, accountDto)
	}

	@Post()
	createUser( @Body() userDto: UserDto){
		return this.userSerivce.create(userDto)
		// this.userSerivce.getAllUsers()
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string){
		return this.userSerivce.removeUser(id)
	}
}
