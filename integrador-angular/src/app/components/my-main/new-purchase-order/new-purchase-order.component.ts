import { Component, OnInit, ViewChild } from '@angular/core';
import { POServiceService } from '../../../services/po-service.service';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
// import { POProduct, PurchasOrder } from '../../../models/purchase-order';
import { Supplier } from '../../../models/supplier';
import { Product } from '../../../models/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchasOrder } from '../../../models/purchase-order';
import { PurchaseOrderDetail } from '../../../models/purchase-order-detail';
import { waitForAsync } from '@angular/core/testing';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-purchase-order',
  templateUrl: './new-purchase-order.component.html',
  styleUrl: './new-purchase-order.component.css',
})
export class NewPurchaseOrderComponent implements OnInit {
  @ViewChild('datepicker1') datepicker1!: NgbDatepicker;
  @ViewChild('datepicker2') datepicker2!: NgbDatepicker;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  purchaseOrders: Array<PurchasOrder> = new Array();
  details: Array<PurchaseOrderDetail> = new Array();
  suppliers: Supplier[] = [];
  products: Product[] = [];
  isFirstItemAdded: boolean = false;
  today: Date = new Date();
  emissionSelected: { year: number; month: number; day: number } = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDate(),
  };
  deliverySelected: { year: number; month: number; day: number } = {
    year: this.today.getFullYear(),
    month: this.today.getMonth() + 1,
    day: this.today.getDate(),
  };

  //  poProducts: POProduct[] = [];

  isDetails: boolean = false;

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
        deleted: false
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
      id: 2,
      status: '',
      deleted: false,
    },
    deleted: false,
  };

  currentOrderDetail: PurchaseOrderDetail = {
    id: 0,
    quantity: 0,
    productId: {
      id: 0,
      sku: '',
      categoryId: {
        id: -1,
        name: '',
        deleted: false,
      },
      name: '',
      description: '',
      price: 0,
      imgUrl: '',
      supplierId: {
        legalName: '',
        codProv: '',
        webSite: '',
        email: '',
        cuit: '',
        urlLogo: '',
        categoryId: {
          id: 0,
          name: '',
          deleted: false
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
    //this.getProducts();
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.poService.getPO(id).subscribe((res) => {
          this.purchaseOrderAux = res;
          let newEmission = new Date(res.emissionDate);
          let newDelivery = new Date(res.deliveryDate);
          this.emissionSelected = {
            year: newEmission.getFullYear(),
            month: newEmission.getMonth() + 1,
            day: newEmission.getDate(),
          };
          this.deliverySelected = {
            year: newDelivery.getFullYear(),
            month: newDelivery.getMonth() + 1,
            day: newDelivery.getDate(),
          };
          this.datepicker1.navigateTo({
            year: newEmission.getFullYear(),
            month: newEmission.getMonth() + 1,
            day: newEmission.getDate(),
          });
          this.datepicker2.navigateTo({
            year: newDelivery.getFullYear(),
            month: newDelivery.getMonth() + 1,
            day: newDelivery.getDate(),
          });
          console.log(this.deliverySelected);
        });
        this.poService.getDetails(id).subscribe((res) => {
          this.details = res;
        });
        setTimeout(()=>{
          this.isDetails = true
        }, 40);
      }
    });
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
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  // getPOs() {
  //   this.poService.getPOs().subscribe((res) => {
  //     this.purchaseOrders = res;
  //   });
  // }

  getProductsBySelectedSupplier() {
    this.productsService
      .getActiveProductsBySupplierId(this.purchaseOrderAux.supplierId.id || 0)
      .subscribe((res) => {
        this.products = res;
      });
  }

  addItem() {
    let addedProduct: boolean = false;
    let det: PurchaseOrderDetail = this.currentOrderDetail;
    let prod = this.products.find((produ) => produ.id == det.productId.id);
    for (let detail of this.details) {
      if (prod !== undefined && detail.productId.id === prod.id) {
        detail.quantity += det.quantity;
        addedProduct = true;
        this.clearOrderDetail();
        this.isFirstItemAdded = true;
      }
    }
    if (prod !== undefined && !addedProduct) {
      det.productId = prod;
      this.details.push(det);
      this.clearOrderDetail();
      this.isFirstItemAdded = true;
    }
  }

  removeItem(index: number) {
    this.details.splice(index, 1);
    if (this.details.length === 0) {
      this.isFirstItemAdded = false;
    }
  }

  addPO() {
    this.purchaseOrderAux.emissionDate = new Date(
      this.emissionSelected.year,
      this.emissionSelected.month,
      this.emissionSelected.day
    );
    this.purchaseOrderAux.deliveryDate = new Date(
      this.deliverySelected.year,
      this.deliverySelected.month,
      this.deliverySelected.day
    );

    this.poService.addPO(this.purchaseOrderAux).subscribe((res) => {
      this.purchaseOrderAux = res;
      this.details.forEach((det) => {
        det.purchaseOrderId = res;
      });
      console.log(this.details);

      for (let det of this.details) {
        this.poService.addDetail(det).subscribe();
      }
      this.successMessage = "Order created successfully."
      this.clearOrderDetail()
      this.clearOrder()
    });

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

  calculateTotal() {
    let total: number = 0;
    this.details.forEach(
      (det) => (total += det.quantity * det.productId.price)
    );
    return total;
  }

  clearOrderDetail() {
    this.currentOrderDetail = {
      id: 0,
      productId: {
        id: 0,
        sku: '',
        categoryId: {
          id: -1,
          name: '',
          deleted: false,
        },
        name: '',
        description: '',
        price: 0,
        imgUrl: '',
        supplierId: {
          legalName: '',
          codProv: '',
          webSite: '',
          email: '',
          cuit: '',
          urlLogo: '',
          categoryId: {
            id: 0,
            name: '',
            deleted: false
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
        deleted: false,
      },
      quantity: 0,
      deleted: false,
    };
  }

  clearOrder(){
    this.details = new Array()
    this.purchaseOrderAux = {
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
          deleted: false
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
        id: 2,
        status: '',
        deleted: false,
      },
      deleted: false,
    };
  }
}
