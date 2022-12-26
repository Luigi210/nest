/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument, AccountSchema } from "src/schemas/account.schema";
import { UserDocument, User } from "src/schemas/user.schema";
import { AccountDto } from "./account-dto";

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name) private accModel: Model<AccountDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async bindAcc(userId: string, account: AccountDto) {
        const accModel = new this.accModel(account)
        accModel.save()
        return this.userModel.findByIdAndUpdate(userId, 
            {
                $set: {
                    'account': account
                }
            }    
        )
    }
}