/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CommentDocument = HydratedDocument<Comments> 

@Schema()
export class Comments {
    @Prop()
    author: string

    @Prop()
    value: string
}

export const CommentSchema = SchemaFactory.createForClass(Comments)