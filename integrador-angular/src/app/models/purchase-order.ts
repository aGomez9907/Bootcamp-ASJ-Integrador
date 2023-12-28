
export interface PurchasOrder{
    id?: number | undefined,
    number: number,
    emission: string,
    delivery: string,
    info: string,
    supplierID: number,
    products: POProduct[],
    total: number,
    isDeleted: boolean,
}

export interface POProduct{
    SKU : string,
    name?: string,
    amount: number
    price: number,
}