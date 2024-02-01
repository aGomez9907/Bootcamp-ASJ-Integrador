import { Injectable } from '@angular/core';
import { proveedores } from '../data/proveedores';
import { Supplier, categoryId, Country, Province, TaxCondition } from '../models/supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root',
})
export class SuppliersServiceService {


  constructor(private http: HttpClient) {

  }


URL_API = 'http://localhost:8080'
  getSuppliers(): Observable<Supplier[]> {
    // return this.data;
    return this.http.get<Supplier[]>(this.URL_API+'/suppliers');
  }

  getSupplier(codProv : string): Observable<Supplier> {
    // return this.data;
    return this.http.get<Supplier>(this.URL_API+'/suppliers/' + codProv);
  }

  getSupplierCategories(): Observable<categoryId[]>{
    return this.http.get<categoryId[]>(this.URL_API+"/suppliercategories");
  }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.URL_API+"/countries");
  }

  getProvinces(): Observable<Province[]>{
    return this.http.get<Province[]>(this.URL_API+"/provinces")
  }

  getTaxConditions(): Observable<TaxCondition[]>{
    return this.http.get<TaxCondition[]>(this.URL_API+"/taxconditions")
  }
  addSupplier(supplier: Supplier): Observable<Supplier> {
    // if (!this.data.find((sup: Supplier) => sup.id === supplier.id)) {
    //   this.data.push(supplier);
    //   return true;
    // } else {
    //   return false;
    // }
    console.log(supplier)
    return this.http.post<Supplier>(this.URL_API+'/suppliers', supplier);
  }

  deleteSupplier(id: number): Observable<Supplier> {
    // let supplier = this.data.find((s: Supplier) => s.id === id);
    // if (supplier) {
    //   this.data.splice(
    //     this.data.findIndex((s: Supplier) => s.id == id),
    //     1
    //   );
    // } else {
    //   console.log(`id ${id} not found`);
    // }
    return this.http.delete<Supplier>(this.URL_API +"/suppliers/"+id )
  }

  updateSupplier(supplier: Supplier): Observable<any> {
  //   let updateIndex = this.data.findIndex(
  //     (s: Supplier) => s.id === supplier.id
  //   );
  //   this.data.splice(updateIndex, 1);
  //   this.data.push(supplier);
  // }
  console.log(supplier);
    return this.http.put(this.URL_API+"/suppliers/"+ supplier.id, supplier )
}
}
