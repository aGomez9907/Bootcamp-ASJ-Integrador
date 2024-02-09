import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepickerConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyHeaderComponent } from './components/my-header/my-header.component';
import { MyFooterComponent } from './components/my-footer/my-footer.component';
import { MySidebarComponent } from './components/my-sidebar/my-sidebar.component';
import { MyMainComponent } from './components/my-main/my-main.component';
import { SuppliersComponent } from './components/my-main/suppliers/suppliers.component';
import { ProductsComponent } from './components/my-main/products/products.component';
import { PurchaseOrdersComponent } from './components/my-main/purchase-orders/purchase-orders.component';
import { HttpClientModule } from '@angular/common/http';

import { Iva } from '../enum/iva-condition';
import { ProductDetailComponent } from './components/my-main/product-detail/product-detail.component';
import { NewPurchaseOrderComponent } from './components/my-main/new-purchase-order/new-purchase-order.component';
import { PurchaseOrderDetailComponent } from './components/my-main/purchase-order-detail/purchase-order-detail.component';
import { NewSupplierComponent } from './components/my-main/new-supplier/new-supplier.component';
import { CuitFormatDirective } from './directives/cuit-format.directive';
import { CategoriesComponent } from './components/my-main/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    MyFooterComponent,
    MySidebarComponent,
    MyMainComponent,
    SuppliersComponent,
    ProductsComponent,
    PurchaseOrdersComponent,
    ProductDetailComponent,
    NewPurchaseOrderComponent,
    PurchaseOrderDetailComponent,
    NewSupplierComponent,
    CuitFormatDirective,
    CategoriesComponent,
    HomeComponent,
    ConfirmModalComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [CuitFormatDirective],
  providers: [ NgbDatepickerConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
