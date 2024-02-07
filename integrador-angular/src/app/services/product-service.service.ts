import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }


  URL_API = 'http://localhost:8080'


  getProducts(): Observable<Product[]> {
    // return this.data;

    return this.http.get<Product[]>(this.URL_API+'/products');

  }

  getProduct(id : string): Observable<Product> {
    // return this.data;
    return this.http.get<Product>(this.URL_API+'/products/' + id);
  }

  getActiveProductsBySupplierId(id: number):Observable<Product[]>{
    return this.http.get<Product[]>(this.URL_API+'/products/sup/'+id)
  }

  getCategories(): Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(this.URL_API+"/productcategories")
  }

  addProduct(product: Product): Observable<Product> {
    // if (!this.data.find((sup: Supplier) => sup.id === supplier.id)) {
    //   this.data.push(supplier);
    //   return true;
    // } else {
    //   return false;
    // }
    return this.http.post<Product>(this.URL_API+'/products', product);
  }

  addProductCategory(category : ProductCategory): Observable<ProductCategory>{
    return this.http.post<ProductCategory>(this.URL_API+"/productcategories", category)
  }

  deleteProductCategory(id: number):Observable<ProductCategory>{
    return this.http.delete<ProductCategory>(this.URL_API+"/productcategories/"+id)
  }

  deleteProduct(id: number): Observable<Product> {
    // let supplier = this.data.find((s: Supplier) => s.id === id);
    // if (supplier) {
    //   this.data.splice(
    //     this.data.findIndex((s: Supplier) => s.id == id),
    //     1
    //   );
    // } else {
    //   console.log(`id ${id} not found`);
    // }
    return this.http.delete<Product>(this.URL_API +"/products/"+id )
  }

  updateProduct(product: Product): Observable<any> {
  //   let updateIndex = this.data.findIndex(
  //     (s: Supplier) => s.id === supplier.id
  //   );
  //   this.data.splice(updateIndex, 1);
  //   this.data.push(supplier);
  // }
    return this.http.put(this.URL_API+"/products/"+product.id, product)
}
}
