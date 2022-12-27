/* eslint-disable prettier/prettier */
export class UserDto {
  firstName: string;
  lastName: string;
  middleName: string;
  IIN: string;
  phoneNumber: string;
  creditCard: string;
  email: string;
  account: {
    IBAN: string;
    countryCode: string;
    CVV: number;
    accountNumber: string;
  };
}

export class CreateUserDto {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  IIN?: string;
  phoneNumber?: string;
  creditCard?: string;
  email?: string;
}

export class AccountDto {
  IBAN: string;
  countryCode: string;
  CVV: number;
  accountNumber: string;
}
