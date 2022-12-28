/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from 'src/schemas/products.schema';
import { Comments, CommentSchema } from 'src/schemas/comment.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: ProductSchema,
        name: Products.name
      },
      {
        schema: CommentSchema,
        name: Comments.name
      },
      {
        schema: UserSchema,
        name: User.name
      }
    ])
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
