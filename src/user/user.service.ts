/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AccountDto, CreateUserDto, UserDto } from './user-dto';
import { User, UserDocument } from '../schemas/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>
	){}

	async getAllUsers(){
		return this.userModel.find().exec()
	}

	async getUser(id: string){
		return this.userModel.findById(id)
	}

	async create(user: UserDto){
		const newUser = new this.userModel(user)
		return newUser.save();
	}

	async removeUser(id: string){
		return this.userModel.findByIdAndRemove(id)
	}

	async createUserAccount(id: string, account: AccountDto){
		return this.userModel.findByIdAndUpdate(id, account, {
			new: true
		})
		// return this.userModel.findById(id)
	}

	// async edit(user: CreateUserDto) {
	// 	this.userModel
	// }

}