import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyHeaderComponent } from './components/my-header/my-header.component';
import { MyFooterComponent } from './components/my-footer/my-footer.component';
import { MySidebarComponent } from './components/my-sidebar/my-sidebar.component';
import { MyMainComponent } from './components/my-main/my-main.component';
import { SuppliersComponent } from './components/my-main/suppliers/suppliers.component';
import { ProductsComponent } from './components/my-main/products/products.component';
import { PurchaseOrdersComponent } from './components/my-main/purchase-orders/purchase-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { SupplierDetailComponent } from './components/my-main/supplier-detail/supplier-detail.component';
import { Iva } from '../enum/iva-condition';
import { ProductDetailComponent } from './components/my-main/product-detail/product-detail.component';


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
    SupplierDetailComponent,
    ProductDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
