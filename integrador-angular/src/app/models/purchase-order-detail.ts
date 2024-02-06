import { Product } from './product';
import { PurchasOrder } from './purchase-order';

export interface PurchaseOrderDetail {
  id: number;
  productId: Product;
  quantity: number;
  deleted: boolean;
  purchaseOrderId?: PurchasOrder
}
