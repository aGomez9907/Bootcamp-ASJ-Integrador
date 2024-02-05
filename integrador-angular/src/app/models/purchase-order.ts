// export interface PurchasOrder{
//     id?: number | undefined,
//     number: number,
//     emission: string,
//     delivery: string,
//     info: string,
//     supplierID: number,
//     products: POProduct[],
//     total: number,
//     isDeleted: boolean,
// }


// export interface POProduct{
    //     SKU : string,
    //     name?: string,
    //     amount: number
    //     price: number,
    // }
    
import { Supplier } from './supplier';

export interface PurchasOrder {
  id?: number | undefined;
  orderNumber: number;
  emissionDate: Date;
  deliveryDate: Date;
  description: string;
  supplierId: Supplier;
  statusId: Status;
  deleted: boolean;
}

export interface Status {
    id: number,
    status: string,
    deleted: boolean
}
