import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './components/my-main/suppliers/suppliers.component';
import { ProductsComponent } from './components/my-main/products/products.component';
import { PurchaseOrdersComponent } from './components/my-main/purchase-orders/purchase-orders.component';

import { ProductDetailComponent } from './components/my-main/product-detail/product-detail.component';
import { NewPurchaseOrderComponent } from './components/my-main/new-purchase-order/new-purchase-order.component';
import { PurchaseOrderDetailComponent } from './components/my-main/purchase-order-detail/purchase-order-detail.component';
import { NewSupplierComponent } from './components/my-main/new-supplier/new-supplier.component';
import { CategoriesComponent } from './components/my-main/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/suppliers', pathMatch: 'full' },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'suppliers/new', component: NewSupplierComponent },
  { path: 'suppliers/update/:id', component: NewSupplierComponent },
  { path: 'suppliers/details/:id', component: NewSupplierComponent },
  {
    path: 'purchase-orders',
    children: [
      { path: '', component: PurchaseOrdersComponent },
      { path: 'new', component: NewPurchaseOrderComponent },
      { path: ':id', component: NewPurchaseOrderComponent },
    ],
  },
  { path: 'products/update/:id', component: ProductDetailComponent },
  { path: 'products/details/:id', component: ProductDetailComponent },
  { path: 'products/new', component: ProductDetailComponent },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
