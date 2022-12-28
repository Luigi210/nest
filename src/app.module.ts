/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { jwtConstants } from '../constants';
import { JwtService } from './jwt/jwt.service';
import { JwtModule as JWT } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/jusan'),
    MongooseModule.forRoot('mongodb+srv://assan:assan123@cluster1.fne8k.mongodb.net/?retryWrites=true&w=majority'),
    UserModule,
    
    AuthModule,
    
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// assan
// assan123
