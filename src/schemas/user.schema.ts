/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Account } from './account.schema';
import { Products } from './products.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop()
	firstName: string

	@Prop()
	lastName: string
	
	@Prop()
	middleName: string
	
	@Prop()
	IIN: string
	
	@Prop()
	phoneNumber: string

	@Prop()
	password: string
	
	@Prop()
	creditCard: string
	
	@Prop([Products])
	favoriteProducts: Products
	
	@Prop()
	email: string

	@Prop({ type: Account })
	account: Account;
}

export const UserSchema = SchemaFactory.createForClass(User)