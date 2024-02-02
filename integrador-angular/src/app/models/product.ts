import { Supplier } from "./supplier";

export interface Product{
    id: number,
    sku: string,
    categoryId: category,
    name: string,
    description: string,
    price: number,
    supplierId: Supplier,
    imgUrl: string,
    deleted:boolean,
}

export interface category{
    id: number,
    name: string,
    deleted: boolean
}