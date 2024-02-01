import { NumberSymbol } from '@angular/common';

export interface Supplier {
  id?: number;
  codProv: string;
  urlLogo?: string;
  legalName: string;
  categoryId: categoryId;
  webSite?: string;
  phoneId: Phone;
  email: string;
  cuit: string;
  logo?: string;
  deleted?: boolean;
  taxConditionId: TaxCondition;
  addressId: Address;
  contactInfoId: contactInfoId;
}

export type categoryId = {
  id: number;
  name: string;
};

export type TaxCondition = {
  id: number;
  name?: string;
  deleted?: boolean;
};

export interface contactInfoId {
  firstName: string;
  lastName: string;
  phoneId: Phone;
  email: string;
  contactRole: string;
  deleted?: boolean;
}

export interface Address {
  postcode: string;
  street: string;
  number: number;
  city: string;
  provinceId: Province;
  deleted?: boolean;
}

export interface Phone {
  country: string;
  phoneNumber: string;
}

// export interface City{
//   name: string;
//   province: Province;
// }
export interface Province {
  id: number;
  name?: string;
  countryId: Country;
}
export interface Country {
  id: number;
  name: string;
}
