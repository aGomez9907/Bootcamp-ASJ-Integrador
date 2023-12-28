import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './components/my-main/suppliers/suppliers.component';
import { ProductsComponent } from './components/my-main/products/products.component';
import { PurchaseOrdersComponent } from './components/my-main/purchase-orders/purchase-orders.component';
import { SupplierDetailComponent } from './components/my-main/supplier-detail/supplier-detail.component';
import { ProductDetailComponent } from './components/my-main/product-detail/product-detail.component';


const routes: Routes = [
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'purchase-orders', component: PurchaseOrdersComponent },
  {path: "suppliers/:codProv", component: SupplierDetailComponent},
  {path: "products/:SKU", component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
