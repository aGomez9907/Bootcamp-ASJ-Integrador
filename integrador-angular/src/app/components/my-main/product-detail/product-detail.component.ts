import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../services/product-service.service';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductCategory } from '../../../models/product';
import { Supplier } from '../../../models/supplier';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  URL_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  isDetails: boolean = false;
  isUpdating: boolean= false;
  validForm: boolean = true
  existsSKU: boolean = false
  categories: Array<ProductCategory> = new Array();
  suppliers: Array<Supplier> = new Array();
  products: Array<Product> = new Array();
  successMessage: string | null = null;
  errorMessage: string | null = null;

  


  p: any;
  idInput: number = 0;
  SKUInput: string = '';
  categoriaInput: string = '';
  nombreInput: string = '';
  descripcionInput: string = '';
  precioInput: number = NaN;
  proveedorInput: string = '';
  imgInput: string = '';

  initialSKU: string = ''

  currentProduct: Product = {
    id: 0,
    sku: '',
    categoryId: {
      id: 0,
      name: '',
      deleted: false,
    },
    name: '',
    description: '',
    price: 0,
    imgUrl: null,
    supplierId: {
      id:0,
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
        id:0,
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
    deleted: false,
  };

  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SuppliersServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      this.isUpdating = this.router.url.includes('update');
      this.isDetails = this.router.url.includes('details');

      if (id != undefined && this.isUpdating) {
        this.productService.getProduct(id).subscribe((res) => {
          this.currentProduct = res;
          this.initialSKU = this.currentProduct.sku;
         
        });
      } else if (id != undefined && this.isDetails) {
        this.productService.getProduct(id).subscribe((res) => {
          this.currentProduct = res;
        });
      }
    });

    this.getCategories()
    this.getSupplierList()
    this.getProducts()

  }

  saveProduct(){
    this.validForm = this.validateForm()
    console.log(this.validForm);
    
    if(this.validForm){
      if (this.isUpdating) {
        this.productService.updateProduct(this.currentProduct).subscribe(res=> this.successMessage="Product updated succesfully.");
  
      } else {
        //this.currentSupplier.deleted = false;
        this.productService.addProduct(this.currentProduct).subscribe((res)=> {
          this.successMessage="Product created succesfully." 
          // this.router.navigate(['/products']);
          this.clearFields()
        });
      }
    }
  }


  getProduct(param: string) {
    this.productService.getProduct(param).subscribe((res) => {
      // console.log(res)
      // this.p = res;
      // this.idInput = this.p[0].id;
      // this.SKUInput = this.p[0].SKU
      // this.categoriaInput = this.p[0].categoria;
      // this.nombreInput = this.p[0].nombre;
      // this.descripcionInput = this.p[0].descripcion;
      // this.precioInput = this.p[0].precio;
      // this.proveedorInput = this.p[0].proveedor
      // this.imgInput = this.p[0].img;
      this.currentProduct = res;
    });
  }

  getProducts(){
    this.productService.getProducts().subscribe((res)=>{
      this.products = res
    })
  }

  getCategories(){
    this.productService.getCategories().subscribe((res)=>{
      this.categories=res.filter((cat)=> cat.deleted == false);
    })
  }
  
  getSupplierList() {
    this.supplierService.getSuppliers().subscribe((res) => {
      this.suppliers = res.filter((sup) => sup.deleted == false);
    });
  }


  imageNotFound(event: Event) {
    (event.target as HTMLImageElement).src = this.URL_IMG;
  }

  SKUExists(): void {
    if (this.initialSKU !== this.currentProduct.sku) {
      this.existsSKU = this.products.some(
        (prod: Product) => prod.sku === this.currentProduct.sku
      );
    }
  }

  clearFields(){
    this.currentProduct = {
      id: 0,
      sku: '',
      categoryId: {
        id: 0,
        name: '',
        deleted: false,
      },
      name: '',
      description: '',
      price: 0,
      imgUrl: '',
      supplierId: {
        id:0,
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
          id:0,
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
      deleted: false,
    };
  }

  validateForm(){
    if(this.currentProduct.categoryId.id == 0  ||
        this.currentProduct.supplierId.id == 0 ||
        this.currentProduct.price == 0||
        !this.validateWebSite(this.currentProduct.imgUrl) ||
        !this.validateStringOf4Digits(this.currentProduct.sku)
      ){
      return false
    }else{
      return true
    }
  }
  validateStringOf4Digits(strng: string) {
    const regex2 = /^[a-zA-Z0-9]{4,12}$/;

    return regex2.test(strng);
  }

  validateWebSite(strng: string | undefined) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    if (strng != undefined && strng != '') {
      return regex.test(strng);
    } else {
      return true;
    }
  }
}
