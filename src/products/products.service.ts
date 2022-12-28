/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from 'src/schemas/products.schema';
import { Model } from 'mongoose';
import { DeleteProduct, LikedProducts, ProductsDto } from './products-dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async addProduct (productsDto: ProductsDto){
        return new this.productModel(productsDto).save()
    }

    async allProducts(){
        return this.productModel.find().exec()
    }

    async getLikedProductsOfTheUser(id: string){
        const found = await this.userModel.findById(id)
        return found
    }

    async addProductToFavorite(productId: LikedProducts){
        const productFound = await this.productModel.findById(productId.id)
        return await this.userModel.findByIdAndUpdate(productId.userId, {
            $push: {
                'favoriteProducts': productFound
            }
        })
    }
    async deleteFromFavs(productId: DeleteProduct){
        return await this.userModel.findByIdAndUpdate(productId.userId, {
            $pull: {
                'favoriteProducts': {
                    _id: productId.id
                },
            }
        })
    }

    async buyProduct(product: {
        id:string,
        userId: string
    }
    ){
        const found = await this.productModel.findById(product.id)

        const user = await this.userModel.findById(product.userId)

        return await this.userModel.findByIdAndUpdate(product.userId, {
            $push: {
                'bought': found
            },
            $set: {
                'account.bought': user.account.balance - found.price,
            }
        })
    }
}
