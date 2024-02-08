import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Product, ProductCategory } from '../../../models/product';
import { NgForm } from '@angular/forms';

import { Supplier } from '../../../models/supplier';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = new Array();
  productsAux: Array<Product> = new Array();
  categories: Array<ProductCategory> = new Array();
  suppliers: string[] = new Array();
  URL_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  searchInput: string = '';

  curretnProduct: Product = {
    id: -1,
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
  };

  constructor(
    public productService: ProductServiceService,
    public suppliersService: SuppliersServiceService
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.getSupplierList();
    this.getCategories();
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

  imageNotFound(event: Event) {
    (event.target as HTMLImageElement).src = this.URL_IMG;
  }

  /*------------------CRUD--------------------*/

  getSupplierList() {
    this.suppliersService.getSuppliers().subscribe((res) => {
      this.suppliers = res.map((prov) => prov.legalName);
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.productsAux = this.products;
      this.orderList()
      console.log(res);
      this.filterActive()
    });
  }

  getCategories(){
    this.productService.getCategories().subscribe(res=>{
      this.categories = res
    })
  }

  addProduct(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      this.productService.addProduct(form.value).subscribe((res) => {
        console.log(res);
        this.getProducts();
      });
    }
  }

  deleteProduct(id: number) {
    let confirmacion = confirm('¿Desea eliminar el producto #' + id + '?');
    if (confirmacion) {
      this.productService.deleteProduct(id).subscribe((res) => {
        console.log(res);
        this.getProducts();
      });
    }
  }

  updateProduct(form: NgForm) {
    this.productService.updateProduct(form.value).subscribe((res) => {
      console.log(res);
      this.getProducts();
    });
  }

  search() {
    if (this.searchInput === '') {
      this.productsAux = this.products;
    } else {
      this.productsAux = this.products.filter(
        (sup) =>
          sup.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          sup.description.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }
    console.log(this.productsAux);
    console.log(this.searchInput);
  }

  filterByCategory(catId: number){
    if(catId === 0){
      this.productsAux = this.products.filter((prod)=> prod.deleted === false)
      this.orderList
    }else{
      this.productsAux = this.products.filter((prod)=> prod.categoryId.id === catId && prod.deleted === false)
      this.orderList();
    }
  }

  orderList() {
    this.productsAux.sort((a,b) => a.name.localeCompare(b.name));
  }

  filterDeleted(){
    this.productsAux = this.products.filter(sup=> sup.deleted == true)
    this.orderList()
  }

  filterActive(){
    this.productsAux = this.products.filter(sup=> sup.deleted == false)
    this.orderList();
    console.log("Estoy andando");
    
  }
}
