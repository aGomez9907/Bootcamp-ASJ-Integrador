export interface Supplier {
  id?: number,
  code?: string;
  legalName: string;
  category: string;
  website?: string;
  phone: string ;
  email: string;
  cuit: string;
  logo?: string;
  isDeleted?: boolean;
  iva: IVAOptions;
  address: Address
  contact : Contact;
  
}



export type IVAOptions =
  | 'IVA Responsable Inscripto'
  | 'IVA Sujeto Exento'
  | 'Responsable Monotributo'
  | 'Proveedor del Exterior'
  | 'Otro';

export interface Contact {
  firstName: string;
  lastName: string
  phone: string;
  email: string;
  role: string;
}

export interface Address {
  postCode: string;
  street: string;
  number: number;
  city: string;
  province: string;
  country: string;
}





