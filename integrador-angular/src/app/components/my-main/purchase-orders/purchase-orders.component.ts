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

  // filterProducts(sup: Supplier){
  //   console.log(sup)
  //   console.log("filtered products",this.products.filter(p => p.proveedor == sup.razonSocial))
  //   return this.products.filter(p => p.proveedor == sup.razonSocial)
  // }

  // filterProducts(id: number) {
  //   let prov = this.suppliers.filter((sup) => sup.id == id);
  //   //console.log("filtered products",this.products.filter(p => p.proveedor == sup.razonSocial))
  //   return this.products.filter((p) => p.proveedor == prov[0].razonSocial);
  // }

  // loadProduct(id: number) {
  //   let products=this.poProducts?.getValue();
  //   let p = this.products.filter((p) => p.id == id);
  //   let poToAdd = {
  //     SKU: p[0].SKU,
  //     name: p[0].nombre,
  //     amount: this.quantityInput,
  //     price: p[0].precio * this.quantityInput,
  //   };
  //   console.log(poToAdd);
  //   products.push(poToAdd);
  //   this.poProducts.next(products)
  //   console.log(this.poProducts);
  // }

  // getTotal() {
  //   let total = 0;
  //   for (let p of this.poProducts.getValue()) {
  //     total += p.amount * p.price;
  //   }
  //   this.totalInput = total;
  // }

  // loadUpdate(po: PurchasOrder) {}

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

  deletePO(id: number |  undefined) {
    let confirmacion = confirm('¿Desea eliminar la orden #' + id + '?');
    if (confirmacion) {
      // this.poService.deletePO(id).subscribe(res=>{
      //   console.log(res);
      //   this.getPOs();
      // })
      this.purchaseOrders.filter((po) => {
        if (po.id == id) {
          po.deleted = true;
        }
      });
      this.activePOs();
    }
  }

  // updatePO(form: NgForm) {
  //   this.poService.updatePO(form.value).subscribe((res) => {
  //     console.log(res);
  //     this.getPOs();
  //   });
  // }

  changeOrderStatus(po: PurchasOrder){
    this.poService.updatePO(po).subscribe((res)=>{
      this.getPOs
      console.log(res);
      
    })
  }
}
