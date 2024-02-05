import { Component, OnInit } from '@angular/core';
import { POServiceService } from '../../../services/po-service.service';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
// import { POProduct, PurchasOrder } from '../../../models/purchase-order';
import { Supplier } from '../../../models/supplier';
import { Product } from '../../../models/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchasOrder } from '../../../models/purchase-order';

@Component({
  selector: 'app-new-purchase-order',
  templateUrl: './new-purchase-order.component.html',
  styleUrl: './new-purchase-order.component.css',
})
export class NewPurchaseOrderComponent implements OnInit {
  purchaseOrders: Array<PurchasOrder> = new Array();
  suppliers: Supplier[] = [];
  products: Product[] = [];

  //  poProducts: POProduct[] = [];

  updateID: string = '';

  purchaseOrderAux: PurchasOrder = {
    orderNumber: 0,
    emissionDate: new Date(),
    deliveryDate: new Date(),
    description: '',
    supplierId: {
      id: 0,
      legalName: '',
      codProv: '',
      webSite: '',
      email: '',
      cuit: '',
      urlLogo: '',
      categoryId: {
        id: 0,
        name: '',
      },
      taxConditionId: {
        id: 0,
      },
      phoneId: {
        id: 0,
        country: '',
        phoneNumber: '',
      },
      addressId: {
        id: 0,
        street: '',
        number: 0,
        postcode: '',
        city: '',
        provinceId: {
          id: 0,
          name: '',
          countryId: {
            id: 0,
            name: '',
          },
        },
      },
      contactInfoId: {
        id: 0,
        firstName: '',
        lastName: '',
        phoneId: {
          id: 0,
          country: '',
          phoneNumber: '',
        },
        email: '',
        contactRole: '',
      },
    },
    statusId: {
      id: 0,
      status: '',
      deleted: false,
    },
    deleted: false,
  };

  print() {
    console.log(this.purchaseOrderAux.deliveryDate);
  }
  // poProductAux: POProduct = {
  //   SKU: '',
  //   name: '',
  //   amount: 0,
  //   price: 0,
  // };

  constructor(
    public poService: POServiceService,
    public suppliersService: SuppliersServiceService,
    public productsService: ProductServiceService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //   this.getPOs();
    this.getSuppliers();
    this.getProducts();
    //   this.updateID = this.route.snapshot.params['id'];
  }

  // isSupplierSelected: boolean = false;

  // idInput: number | undefined = 0;
  // orderNumberInput: number = 0;
  // emissionInput: string = new Date().toLocaleDateString('es-AR');
  // deliveryInput: string = '';
  // infoInput: string = '';

  // supplierId: number = 0;
  // productId: number = 0;
  // productsInput: POProduct = this.poProductAux;
  // quantityInput: number = 0;
  // totalInput: number = 0;

  // resetFields() {
  //   this.poProducts = [];
  //   this.isSupplierSelected = false;
  //   this.idInput = 0;
  //   this.orderNumberInput = 0;
  //   this.emissionInput = new Date().toLocaleDateString('es-AR');
  //   this.deliveryInput = '';
  //   this.infoInput = '';
  //   this.supplierId = 0;
  //   this.productId = 0;
  //   this.productsInput = this.poProductAux;
  //   this.quantityInput = 0;
  //   //se que esto está mal pero ya no se me ocurre otra forma de solucionarlo
  //   window.location.reload();
  // }

  // activePOs() {
  //  let h = this.purchaseOrders.filter((po) => !po.isDeleted);
  // return h;
  //  }

  // filterProducts(sup: Supplier){
  //   console.log(sup)
  //   console.log("filtered products",this.products.filter(p => p.proveedor == sup.razonSocial))
  //   return this.products.filter(p => p.proveedor == sup.razonSocial)
  // }

  // filterProducts(id: number) {
  //   let prov = this.suppliers.filter((sup) => sup.id == id);
  //   //console.log("filtered products",this.products.filter(p => p.proveedor == sup.razonSocial))
  //   return this.products.filter((p) => p.supplierId.legalName == prov[0].legalName);
  // }

  // loadProduct(id: number) {
  //   let p = this.products.filter((p) => p.id == id);
  //   let poToAdd = {
  //     SKU: p[0].sku,
  //     name: p[0].name,
  //     amount: this.quantityInput,
  //     price: p[0].price * this.quantityInput,
  //   };

  //   this.poProducts.push(poToAdd);
  // }

  // getTotal() {
  //   let total = 0;
  //   for (let p of this.poProducts) {
  //     total += p.amount * p.price;
  //   }
  //   this.totalInput = total;
  // }

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

  // getPOs() {
  //   this.poService.getPOs().subscribe((res) => {
  //     this.purchaseOrders = res;
  //   });
  // }

  addPO() {
    // this.purchaseOrderAux.number = this.orderNumberInput;
    // this.purchaseOrderAux.delivery = this.deliveryInput;
    // this.purchaseOrderAux.emission = this.emissionInput;
    // this.purchaseOrderAux.info = this.infoInput;
    // this.purchaseOrderAux.supplierID = this.supplierId;
    // this.purchaseOrderAux.total = this.totalInput;
    // this.purchaseOrderAux.products = this.poProducts;
    // console.log(form.value);
    // if (form.valid) {
    //   this.poService.addPO(this.purchaseOrderAux).subscribe((res) => {
    //     console.log(res);
    //     this.getPOs();
    //     this.router.navigate(['/purchase-orders']);
    //   });
    // }
  }

  // // deletePO(id: number) {
  // //   let confirmacion = confirm('¿Desea eliminar la orden #' + id + '?');
  // //   if (confirmacion) {
  // //     // this.poService.deletePO(id).subscribe(res=>{
  // //     //   console.log(res);
  // //     //   this.getPOs();
  // //     // })
  // //     this.purchaseOrders.filter((po) => {
  // //       if (po.id == id) {
  // //         po.isDeleted = true;
  // //       }
  // //     });
  // //     this.activePOs();
  // //   }
  // // }

  // updatePO(form: NgForm) {
  //   this.poService.updatePO(form.value).subscribe((res) => {
  //     console.log(res);
  //     this.getPOs();
  //   });
  // }
}
