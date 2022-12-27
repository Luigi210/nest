/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { JwtService } from '../jwt/jwt.service';
import { jwtConstants } from '../../constants';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtModule as JWT } from 'src/jwt/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
			{
				schema: UserSchema,
				name: User.name
			},
		]),
    UserModule,
    JWT,
    JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: {
				expiresIn: '60d'
			}
		}),
  ],
  providers: [AuthService, ],
  controllers: [AuthController],
})
export class AuthModule {}