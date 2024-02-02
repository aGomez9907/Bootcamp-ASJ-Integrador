import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Product } from '../../../models/product';
import { NgForm } from '@angular/forms';
import { ProductCategory } from '../../../../enum/category-products';
import { Supplier } from '../../../models/supplier';

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



  curretnProduct: Product = {
    id:-1,
    sku:'',
    categoryId:{
      id: -1,
      name:'',
      deleted: false
    },
    name: '',
    description: '',
    price: 0,
    imgUrl: '',
    supplierId:{
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
        id:0,
        country: '',
        phoneNumber: '',
      },
      addressId: {
        id:0,
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
        id:0,
        firstName: '',
        lastName: '',
        phoneId: {
          id:0,
          country: '',
          phoneNumber: '',
        },
        email: '',
        contactRole: '',
      },
    },
    deleted: false
  }
  


constructor(public productService: ProductServiceService, public suppliersService: SuppliersServiceService){
  this.productService;
  this.getSupplierList();
}




  ngOnInit(): void {
    this.getProducts();

  }



  // loadUpdate(s: Product) {
  //   this.idInput = s.id;
  //   this.SKUInput  = s.sku;
  //   this.categoriaInput  = s.categoria;
  //   this.nombreInput  = s.name;
  //   this.descripcionInput  = s.description;
  //   this.precioInput  = s.price;
  //   this.proveedorInput  = s.supplierId;
  //   this.imgInput  = s.imgUrl;
   
  // }

  // resetFields() {
  // this.idInput = 0;
  // this.SKUInput = '';
  // this.categoriaInput = '';
  // this.nombreInput = '';
  // this.descripcionInput = '';
  // this.precioInput = NaN;
  // this.proveedorInput = '';
  // this.imgInput = '';
  // }


imageNotFound(event: Event){
  (event.target as HTMLImageElement).src = this.URL_IMG;
}



/*------------------CRUD--------------------*/

getSupplierList(){
  this.suppliersService.getSuppliers().subscribe(res => {
    this.suppliers = res.map(prov => prov.legalName);
    
    
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
    let confirmacion = confirm('¿Desea eliminar el producto #' + id + '?');
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
