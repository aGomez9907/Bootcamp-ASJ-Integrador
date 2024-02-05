import { Product } from './product';

export interface PurchaseOrderDetail {
  id: number;
  product: Product;
  quantity: number;
  deleted: boolean;
}
