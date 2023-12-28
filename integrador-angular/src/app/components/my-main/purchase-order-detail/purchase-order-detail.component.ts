import { Component, OnInit } from '@angular/core';
import { POServiceService } from '../../../services/po-service.service';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { ActivatedRoute } from '@angular/router';

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

  orderToShow: string = '';
  ngOnInit(): void {
    this.orderToShow = this.route.snapshot.params['id'];
  }


  getPO(id: string){
    this.poService.getPO(id).subscribe()
  }
}
