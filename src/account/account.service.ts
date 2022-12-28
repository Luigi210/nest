/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument, AccountSchema } from "src/schemas/account.schema";
import { UserDocument, User } from "src/schemas/user.schema";
import { AccountDto, TransferDto } from "./account-dto";

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

    async findAccountByPhonenumber(phn: string){
        const found = await this.userModel.findOne({
            phoneNumber: phn
        })
        console.log(found)
        if(found){
            return found
        }
        return {
            message: "Not found"
        }
    }

    async transferMoney(transactionDto: TransferDto){
        const fromUser = await this.userModel.findOne({
            phoneNumber: transactionDto.fromPhonenumber
        })
        const toUser = await this.userModel.findOne({
            phoneNumber: transactionDto.toPhonenumber
        })

        if(transactionDto.amount >= 100){
            if(transactionDto.amount > fromUser.account.balance){
                return {
                    message: "More than you have"
                }
            }
            else {
                await this.userModel.findByIdAndUpdate(fromUser._id, {
                    $set: {
                        'account.balance': fromUser.account.balance - transactionDto.amount
                    }
                })

                await this.userModel.findByIdAndUpdate(toUser._id, {
                    $set: {
                        'account.balance': toUser.account.balance + transactionDto.amount
                    }
                })

                return {
                    message: "Successfully transferred amount"
                }
            }
        }
        else {
            return {
                message: "Min is 100"
            }
        }
    }
}