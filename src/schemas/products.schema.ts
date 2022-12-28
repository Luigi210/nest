/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Comments } from "./comment.schema";

export type ProductsDocument = HydratedDocument<Products>

@Schema()
export class Products {
    @Prop()
    name: string
    
    @Prop()
    description: string

    @Prop()
    likes: number

    @Prop({default: null})
    imgURL: string 
    // @Prop({
    //     data
    // })
    // photo: 

    @Prop({default: 12000})
    price: number

    @Prop([Comments])
    comments: Comments[]
}

export const ProductSchema = SchemaFactory.createForClass(Products)