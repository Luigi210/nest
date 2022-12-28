/* eslint-disable prettier/prettier */
export class ProductsDto {
    name: string
    description: string
    price: number
    likes: number
    comments: CommentsDto[]
}

export class CommentsDto {
    author: string;
    value: string
}

export class LikedProducts{
    id: string
    userId: string
}

export class DeleteProduct extends LikedProducts{
    
}

export class ShowFavoriteProducts{
    userId: string
}