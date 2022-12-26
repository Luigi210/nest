/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import { AccountController } from 'src/account/account.controller';
import { AccountService } from 'src/account/account.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from '../../constants';
import { JwtService } from 'src/auth/jwt.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports: [MongooseModule.forFeature([
		{
			schema: UserSchema,
			name: User.name
		},
		{
			schema: AccountSchema,
			name: Account.name
		}
	])
	],
	controllers: [UserController, AccountController],
	providers: [UserService, AccountService]
})
export class UserModule {}