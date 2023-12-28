import { Injectable } from '@angular/core';
import { proveedores } from '../data/proveedores';
import { Supplier } from '../models/supplier';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root',
})
export class SuppliersServiceService {


  constructor(private http: HttpClient) {

  }


URL_API = 'http://localhost:3000'
  getSuppliers(): Observable<Supplier[]> {
    // return this.data;
    return this.http.get<Supplier[]>(this.URL_API+'/proveedores');
  }

  getSupplier(codProv : string): Observable<Supplier> {
    // return this.data;
    return this.http.get<Supplier>(this.URL_API+'/proveedores?codProv=' + codProv);
  }



  addSupplier(supplier: Supplier): Observable<Supplier> {
    // if (!this.data.find((sup: Supplier) => sup.id === supplier.id)) {
    //   this.data.push(supplier);
    //   return true;
    // } else {
    //   return false;
    // }
    return this.http.post<Supplier>(this.URL_API+'/proveedores', supplier);
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
    return this.http.delete<Supplier>(this.URL_API +"/proveedores/"+id )
  }

  updateSupplier(supplier: Supplier): Observable<any> {
  //   let updateIndex = this.data.findIndex(
  //     (s: Supplier) => s.id === supplier.id
  //   );
  //   this.data.splice(updateIndex, 1);
  //   this.data.push(supplier);
  // }
  console.log(supplier);
    return this.http.put(this.URL_API+"/proveedores/"+ supplier.id, supplier )
}
}
