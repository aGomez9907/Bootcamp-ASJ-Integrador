import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }


  URL_API = 'http://localhost:3000'


  getProducts(): Observable<Product[]> {
    // return this.data;

    return this.http.get<Product[]>(this.URL_API+'/productos');

  }

  getProduct(SKU : string): Observable<Product> {
    // return this.data;
    return this.http.get<Product>(this.URL_API+'/productos?SKU=' + SKU);
  }



  addProduct(product: Product): Observable<Product> {
    // if (!this.data.find((sup: Supplier) => sup.id === supplier.id)) {
    //   this.data.push(supplier);
    //   return true;
    // } else {
    //   return false;
    // }
    return this.http.post<Product>(this.URL_API+'/productos', product);
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
    return this.http.delete<Product>(this.URL_API +"/productos/"+id )
  }

  updateProduct(product: Product): Observable<any> {
  //   let updateIndex = this.data.findIndex(
  //     (s: Supplier) => s.id === supplier.id
  //   );
  //   this.data.splice(updateIndex, 1);
  //   this.data.push(supplier);
  // }
    return this.http.put(this.URL_API+"/productos/"+product.id, product)
}
}
