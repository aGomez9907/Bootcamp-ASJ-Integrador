import { Supplier } from "./supplier";

export interface Product{
    id: number,
    sku: string,
    categoryId: ProductCategory,
    name: string,
    description: string,
    price: number,
    supplierId: Supplier,
    imgUrl: any,
    deleted:boolean,
}

export interface ProductCategory{
    id: number,
    name: string,
    deleted: boolean
}