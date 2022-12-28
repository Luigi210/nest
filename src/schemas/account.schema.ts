/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserService } from "src/user/user.service";
import { User } from "./user.schema";

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {

    // @Prop({ type: User })
    // owner: User;

    @Prop()
    IBAN: string

    @Prop()
    countryCode: string;

    @Prop({ default: null })
    balance: number;
    
    @Prop()
    CVV: number;

    @Prop()
    accountNumber: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account)