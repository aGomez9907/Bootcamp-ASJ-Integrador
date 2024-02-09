import { Component, OnInit } from '@angular/core';
import { POServiceService } from '../../../services/po-service.service';
import { PurchasOrder, Status } from '../../../models/purchase-order';
import { NgForm } from '@angular/forms';
import { Supplier } from '../../../models/supplier';
import { Product } from '../../../models/product';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { ProductServiceService } from '../../../services/product-service.service';
// import { POProduct } from '../../../models/purchase-order-detail';
import { DatePipe, formatDate } from '@angular/common';
import { BehaviorSubject, Observable, of, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css',
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrders: PurchasOrder[] = [];
  purchaseOrdersAux: PurchasOrder[] = [];
  suppliers: Supplier[] = [];
  products: Product[] = [];
  statuses:Status[] = []


  constructor(
    public poService: POServiceService,
    public suppliersService: SuppliersServiceService,
    public productsService: ProductServiceService
  ) {}

  ngOnInit(): void {
    this.getPOs();
    this.getSuppliers();
    this.getProducts();
    this.getStatuses()

  }



  activePOs() {
    let h = this.purchaseOrders.filter((po) => !po.deleted);
    return h;
  }



  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((res) => {
      this.suppliers = res;
      console.log(res);
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(res);
    });
  }

  getPOs() {
    this.poService.getPOs().subscribe((res) => {
      this.purchaseOrders = res;
      this.purchaseOrdersAux = this.purchaseOrders
      console.log(res);
      
    });
  }

  getStatuses(){
    this.poService.getStatuses().subscribe((res)=>{
      this.statuses = res
    })
  }

  addPO(form: NgForm) {
    console.log(form.value);

    if (form.valid) {
      this.poService.addPO(form.value).subscribe((res) => {
        console.log(res);
        this.getPOs();
      });
    }
  }

  // deletePO(id: number |  undefined) {
  //   let confirmacion = confirm('¿Desea eliminar la orden #' + id + '?');
  //   if (confirmacion) {
  //     this.purchaseOrders.filter((po) => {
  //       if (po.id == id) {
  //         po.deleted = true;
  //       }
  //     });
  //     this.activePOs();
  //   }
  // }


  filterByStatus(statId: number){
    if(statId == 0){
      this.purchaseOrdersAux = this.purchaseOrders
      console.log(this.purchaseOrders);
      
    }else{
      this.purchaseOrdersAux = this.purchaseOrders.filter((prod)=> prod.statusId.id === statId)
      
    }
  }

  changeOrderStatus(po: PurchasOrder){
    this.poService.updatePO(po).subscribe((res)=>{
      this.getPOs
      console.log(res);
      
    })
  }
}
