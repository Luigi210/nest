/* eslint-disable prettier/prettier */
export class AccountDto {
  IBAN: string;
  countryCode: string;
  CVV: number;
  accountNumber: string;
  balance: number
}

export class TransferDto {
  fromPhonenumber: string
  toPhonenumber: string
  amount: number
}

export class PhoneNumberDto{
  phoneNumber: string
}