/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeleteProduct, LikedProducts, ProductsDto, ShowFavoriteProducts } from './products-dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ){}

    @Post()
    async addProduct(@Body() productsDto: ProductsDto){
        return await this.productsService.addProduct(productsDto)
    }

    @Get()
    async getProducts(@Body() showfav: ShowFavoriteProducts){
        return await this.productsService.allProducts()
    }

    @Get('showliked')
    async liked(@Body() product: ShowFavoriteProducts){
        return await this.productsService.getLikedProductsOfTheUser(product.userId)
    }

    @Post('addtofav')
    async addToFav(@Body() liked: LikedProducts ){
        return await this.productsService.addProductToFavorite(liked)
    }

    @Delete()
    async deleteProductFromFav(@Body() deleteProduct: DeleteProduct){
        return await this.productsService.deleteFromFavs(deleteProduct)
    }
}
