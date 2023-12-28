import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Product } from '../../../models/product';
import { NgForm } from '@angular/forms';
import { ProductCategory } from '../../../../enum/category-products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: Array<Product> = new Array();
  categories = Object.entries(ProductCategory).map(([key, value]) => ({ key, value }));
  suppliers: string[] = new Array();
  URL_IMG= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"

  idInput: number=0;
  SKUInput: string = '';
  categoriaInput: string = '';
  nombreInput: string = '';
  descripcionInput: string = '';
  precioInput: number = NaN;
  proveedorInput: string = '';
  imgInput: string = '';
  


constructor(public productService: ProductServiceService, public suppliersService: SuppliersServiceService){
  this.productService;
  this.getSupplierList();
}




  ngOnInit(): void {
    this.getProducts();

  }



  loadUpdate(s: Product) {
    this.idInput = s.id;
    this.SKUInput  = s.SKU;
    this.categoriaInput  = s.categoria;
    this.nombreInput  = s.nombre;
    this.descripcionInput  = s.descripcion;
    this.precioInput  = s.precio;
    this.proveedorInput  = s.proveedor;
    this.imgInput  = s.img;
   
  }

  resetFields() {
  this.idInput = 0;
  this.SKUInput = '';
  this.categoriaInput = '';
  this.nombreInput = '';
  this.descripcionInput = '';
  this.precioInput = NaN;
  this.proveedorInput = '';
  this.imgInput = '';
  }


imageNotFound(event: Event){
  (event.target as HTMLImageElement).src = this.URL_IMG;
}



/*------------------CRUD--------------------*/

getSupplierList(){
  this.suppliersService.getSuppliers().subscribe(res => {
    this.suppliers = res.map(prov => prov.razonSocial);
    
  });

}



  getProducts(){
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      console.log(res)
    });

  }

  addProduct(form: NgForm) {
    console.log(form.value)
    if(form.valid){
      this.productService.addProduct(form.value).subscribe(res =>{
        console.log(res);
        this.getProducts();
      })}
    }



  deleteProduct(id: number) {
    let confirmacion = confirm('¿Desea eliminar el proveedor #' + id + '?');
    if (confirmacion) {
      this.productService.deleteProduct(id).subscribe(res=>{
        console.log(res);
        this.getProducts();
      })
    }
  }


  updateProduct(form: NgForm) {
    
    this.productService.updateProduct(form.value).subscribe(res => {
      console.log(res);
      this.getProducts();
    });
  }


}
