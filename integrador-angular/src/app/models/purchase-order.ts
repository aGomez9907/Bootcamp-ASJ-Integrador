import { Supplier } from "./supplier";
import { POProduct } from "./POProduct"; 
export interface PurchasOrder{
    id: number,
    number: number,
    emission: string,
    delivery: string,
    info: string,
    supplier: Supplier,
    products: POProduct[],
    total: number,
}