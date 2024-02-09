import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbDatepicker,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';

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

  minDate: NgbDateStruct = { year: 1900, month: 1, day: 1 };
  existsOrderNumber: boolean = false;
  validOrderDetail: boolean = true;
  validForm: boolean = true;

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
        deleted: false,
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
      id: 3,
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
          deleted: false,
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

  constructor(
    public poService: POServiceService,
    public suppliersService: SuppliersServiceService,
    public productsService: ProductServiceService,
    public router: Router,
    private route: ActivatedRoute,
    private calendar: NgbCalendar
  ) {}

  ngOnInit(): void {
    this.getPOs();
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
        setTimeout(() => {
          this.isDetails = true;
        }, 300);
      } else {
        this.minDate = this.calendar.getToday();
      }
    });
  }

  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((res) => {
      this.suppliers = res.filter((sup) => sup.deleted == false);
    });
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  getPOs() {
    this.poService.getPOs().subscribe((res) => {
      this.purchaseOrders = res;
    });
  }

  getProductsBySelectedSupplier() {
    this.productsService
      .getActiveProductsBySupplierId(this.purchaseOrderAux.supplierId.id || 0)
      .subscribe((res) => {
        this.products = res;
      });
  }

  addItem() {
    this.validOrderDetail = true;
    let addedProduct: boolean = false;
    let det: PurchaseOrderDetail = this.currentOrderDetail;
    let prod = this.products.find((produ) => produ.id == det.productId.id);
    if (
      this.currentOrderDetail.quantity != 0 &&
      this.currentOrderDetail.productId.id != 0 &&
      this.purchaseOrderAux.supplierId.id != 0
    ) {
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
    } else {
      this.validOrderDetail = false;
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
    if (
      this.details.length > 0 &&
      !(
        this.purchaseOrderAux.emissionDate > this.purchaseOrderAux.deliveryDate
      ) &&
      this.purchaseOrderAux.orderNumber != 0 &&
      this.purchaseOrderAux.supplierId.id != 0
    ) {
      this.poService.addPO(this.purchaseOrderAux).subscribe((res) => {
        this.purchaseOrderAux = res;
        this.details.forEach((det) => {
          det.purchaseOrderId = res;
        });
        console.log(this.details);

        for (let det of this.details) {
          this.poService.addDetail(det).subscribe();
        }
        this.successMessage = 'Order created successfully.';
        this.clearOrderDetail();
        this.clearOrder();
      });
    } else {
      this.validForm = false;
    }
  }

  orderNumberExists() {
    this.existsOrderNumber = this.purchaseOrders.some(
      (ord: PurchasOrder) =>
        ord.orderNumber == this.purchaseOrderAux.orderNumber
    );
  }

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
            deleted: false,
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

  clearOrder() {
    this.details = new Array();
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
          deleted: false,
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
