/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import { AccountController } from 'src/account/account.controller';
import { AccountService } from 'src/account/account.service';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				schema: UserSchema,
				name: User.name
			},
			{
				schema: AccountSchema,
				name: Account.name
			},
		]),
		// JwtModule
	],
	controllers: [UserController, AccountController],
	providers: [UserService, AccountService,],
	exports: [UserService]
})
export class UserModule {}