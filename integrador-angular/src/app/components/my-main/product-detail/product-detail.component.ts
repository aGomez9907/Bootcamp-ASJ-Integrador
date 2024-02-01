import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  URL_IMG= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"


  p: any;
  idInput: number=0;
  SKUInput: string = '';
  categoriaInput: string = '';
  nombreInput: string = '';
  descripcionInput: string = '';
  precioInput: number = NaN;
  proveedorInput: string = '';
  imgInput: string = '';
  constructor(public productService: ProductServiceService, private route: ActivatedRoute){this.productService;}
  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.p = this.getProduct(params['id'])});
      
  }
  
  
    getProduct(param : number){
      this.productService.getProduct(param).subscribe(res =>{
        console.log(res)
        this.p = res;
        this.idInput = this.p[0].id;
        this.SKUInput = this.p[0].SKU
        this.categoriaInput = this.p[0].categoria;
        this.nombreInput = this.p[0].nombre;
        this.descripcionInput = this.p[0].descripcion;
        this.precioInput = this.p[0].precio;
        this.proveedorInput = this.p[0].proveedor
        this.imgInput = this.p[0].img;

      })
      
  
    }
    imageNotFound(event: Event){
      (event.target as HTMLImageElement).src = this.URL_IMG;
    }
    
}

  


