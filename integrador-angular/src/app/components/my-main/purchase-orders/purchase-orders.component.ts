import { Component, OnInit } from '@angular/core';
import { POServiceService } from '../../../services/po-service.service';
import { PurchasOrder } from '../../../models/purchase-order';
import { NgForm } from '@angular/forms';
import { Supplier } from '../../../models/supplier';
import { Product } from '../../../models/product';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { ProductServiceService } from '../../../services/product-service.service';
import { POProduct } from '../../../models/POProduct';
import { DatePipe, formatDate } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css',
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrders: PurchasOrder[] = [];
  suppliers: Supplier[] = [];
  products: Product[] = [];

  poProducts = new BehaviorSubject<POProduct[]>([]);

  supAux: Supplier = {
    id: -1,
    codProv: '',
    razonSocial: '',
    rubro: '',
    website: '',
    telefono: -1,
    email: '',
    direccion: '',
    cp: '',
    localidad: '',
    provincia: '',
    pais: '',
    iva: '',
    cuit: '',
    nombreContacto: '',
    apellidoContacto: '',
    telefonoContacto: -1,
    emailContacto: '',
    rolContacto: '',
  };

  poProductAux: POProduct = {
    SKU: '',
    name: '',
    amount: 0,
    price: 0,
  };

  constructor(
    public poService: POServiceService,
    public suppliersService: SuppliersServiceService,
    public productsService: ProductServiceService
  ) {}

  ngOnInit(): void {
    this.getPOs();
    this.getSuppliers();
    this.getProducts();
    this.poProducts.asObservable().subscribe(a=>{
      this.poProducts.next(a)
    })
  }

  isSupplierSelected: boolean = false;

  idInput: number = 0;
  orderNumberInput: number = 0;
  emissionInput: string = new Date().toLocaleDateString('es-AR');
  deliveryInput: string = '';
  infoInput: string = '';
  supplierInput: Supplier = this.supAux;
  supplierId: number = 0;
  productId: number = 0;
  productsInput: POProduct = this.poProductAux;
  quantityInput: number = 0;
  totalInput: number = 0;

  resetFields() {
    this.poProducts.next([]);
    this.isSupplierSelected = false;
    this.idInput = 0;
    this.orderNumberInput = 0;
    this.emissionInput = new Date().toLocaleDateString('es-AR');
    this.deliveryInput = '';
    this.infoInput = '';
    this.supplierId = 0;
    this.productId = 0;
    this.supplierInput = this.supAux;
    this.productsInput = this.poProductAux;
    this.quantityInput = 0;

    console.log(this.poProducts);
  }

  activePOs() {
    let h = this.purchaseOrders.filter((po) => !po.isDeleted);
    return h;
  }

  // filterProducts(sup: Supplier){
  //   console.log(sup)
  //   console.log("filtered products",this.products.filter(p => p.proveedor == sup.razonSocial))
  //   return this.products.filter(p => p.proveedor == sup.razonSocial)
  // }

  filterProducts(id: number) {
    let prov = this.suppliers.filter((sup) => sup.id == id);
    //console.log("filtered products",this.products.filter(p => p.proveedor == sup.razonSocial))
    return this.products.filter((p) => p.proveedor == prov[0].razonSocial);
  }

  loadProduct(id: number) {
    let products=this.poProducts?.getValue();
    let p = this.products.filter((p) => p.id == id);
    let poToAdd = {
      SKU: p[0].SKU,
      name: p[0].nombre,
      amount: this.quantityInput,
      price: p[0].precio * this.quantityInput,
    };
    console.log(poToAdd);
    products.push(poToAdd);
    this.poProducts.next(products)
    console.log(this.poProducts);
  }

  getTotal() {
    let total = 0;
    for (let p of this.poProducts.getValue()) {
      total += p.amount * p.price;
    }
    this.totalInput = total;
  }

  loadUpdate(po: PurchasOrder) {}

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
    });
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

  deletePO(id: number) {
    let confirmacion = confirm('¿Desea eliminar la orden #' + id + '?');
    if (confirmacion) {
      // this.poService.deletePO(id).subscribe(res=>{
      //   console.log(res);
      //   this.getPOs();
      // })
      this.purchaseOrders.filter((po) => {
        if (po.id == id) {
          po.isDeleted = true;
        }
      });
      this.activePOs();
    }
  }

  updatePO(form: NgForm) {
    this.poService.updatePO(form.value).subscribe((res) => {
      console.log(res);
      this.getPOs();
    });
  }
}
