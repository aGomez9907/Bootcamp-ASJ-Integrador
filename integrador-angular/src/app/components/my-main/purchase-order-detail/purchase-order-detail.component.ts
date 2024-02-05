import { Component, OnInit } from '@angular/core';
import { POServiceService } from '../../../services/po-service.service';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { ActivatedRoute } from '@angular/router';
//import { POProduct } from '../../../models/purchase-order';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrl: './purchase-order-detail.component.css',
})
export class PurchaseOrderDetailComponent implements OnInit {
  constructor(
    public poService: POServiceService,
    public suppliersService: SuppliersServiceService,
    public productsService: ProductServiceService,
    public route: ActivatedRoute,
  ) {}





  idInput: number | undefined = 0;
  orderNumberInput: number = 0;
  emissionInput: string = '';
  deliveryInput: string = '';
  infoInput: string = '';

  supplierId: number = 0;
  productId: number = 0;
  //poProducts: POProduct[] = [];
  quantityInput: number = 0;
  totalInput: number = 0;


  orderToShow: string = '';
  ngOnInit(): void {
    this.orderToShow = this.route.snapshot.params['id'];
    // this.getPO(this.orderToShow)
  }


  // getPO(id: string){
  //   this.poService.getPO(id).subscribe(res =>{
  //     console.log(res)
  //     this.orderNumberInput = res.number;
  //     this.deliveryInput = res.delivery;
  //     this.emissionInput = res.emission;
  //     this.infoInput = res.info;
  //     this.supplierId = res.supplierID;
  //     this.totalInput = res.total;
  //     this.poProducts = res.products;
  //   })
  // }
}
