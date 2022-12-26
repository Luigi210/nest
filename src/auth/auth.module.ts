/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { jwtConstants } from '../../constants';

@Module({
  imports: [
    JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: {
				expiresIn: '60d'
			}
		})
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
