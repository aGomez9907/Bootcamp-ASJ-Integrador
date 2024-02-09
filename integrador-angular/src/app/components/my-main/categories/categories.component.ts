import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { ProductServiceService } from '../../../services/product-service.service';
import { ProductCategory } from '../../../models/product';
import { Supplier, SupplierCategory } from '../../../models/supplier';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private supplierService: SuppliersServiceService,
    private productService : ProductServiceService,
    private router: Router
  ) {}

  supplierCategories: Array<SupplierCategory>= new Array()
  productCategories: Array<ProductCategory> = new Array()

  productCategoryExists: boolean = false
  supplierCategoryExists: boolean = false

  productCategoryInput: ProductCategory ={
    name : '',
    id: 0,
    deleted: false
  }

  supplierCategoryInput: SupplierCategory ={
    name : '',
    id: 0,
    deleted: false
  }

  ngOnInit(): void {
    this.getProductCategories()
    this.getSupplierCategories()
  }


  getSupplierCategories(){
    this.supplierService.getSupplierCategories().subscribe((res)=>{
      this.supplierCategories = res
    })
  }

  getProductCategories(){
    this.productService.getCategories().subscribe((res)=>{
      this.productCategories = res
    })
  }
  
  addProductCategory(){
    this.productCategoryExists = this.productCategories.some((cat)=> cat.name.toLowerCase() == this.productCategoryInput.name.toLowerCase())
    if(!this.productCategoryExists){
      this.productService.addProductCategory(this.productCategoryInput).subscribe(res=> this.getProductCategories())
    }

  }

  addSupplierCategory(){
    this.supplierCategoryExists = this.supplierCategories.some((cat)=> cat.name.toLowerCase() == this.supplierCategoryInput.name.toLowerCase())
    if(!this.supplierCategoryExists){
    this.supplierService.addSupplierCategory(this.supplierCategoryInput).subscribe(res=> this.getSupplierCategories())
    }
  }

  deleteSupplierCategory(id:number){
    this.supplierService.deleteSupplierCategory(id).subscribe(res => this.getSupplierCategories())
  }
  deleteProductCategory(id:number){
    this.productService.deleteProductCategory(id).subscribe(res => this.getProductCategories())
  }
}
