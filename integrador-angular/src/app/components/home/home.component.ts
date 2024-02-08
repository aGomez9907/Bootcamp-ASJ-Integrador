import { Component, OnInit } from '@angular/core';
import { SuppliersServiceService } from '../../services/suppliers-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { POServiceService } from '../../services/po-service.service';
import { Supplier } from '../../models/supplier';
import { PurchasOrder } from '../../models/purchase-order';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

suppliers : Supplier[] = []
purchaseOrders: PurchasOrder[] = []
products: Product[]= []

constructor(private supplierService: SuppliersServiceService,
  private productService : ProductServiceService,
  private poService : POServiceService){}


ngOnInit(): void {
  this.getPOs()
  this.getProducts()
  this.getSuppliers()
}


getSuppliers(){
this.supplierService.getSuppliers().subscribe((res)=>{
  this.suppliers = res
})
}

getProducts(){
  this.productService.getProducts().subscribe((res)=>{
    this.products = res
  })
  }

  getPOs(){
    this.poService.getPOs().subscribe((res)=>{
      this.purchaseOrders = res
    })
    }
  
}
