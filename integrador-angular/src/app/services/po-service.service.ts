import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchasOrder } from '../models/purchase-order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class POServiceService {

  constructor(private http: HttpClient) { }

  URL_API = 'http://localhost:8080'


  getPOs(): Observable<PurchasOrder[]> {
    
    return this.http.get<PurchasOrder[]>(this.URL_API+'/purchaseorders');

  }

  getPO(id : string): Observable<PurchasOrder> {

    return this.http.get<PurchasOrder>(this.URL_API+'/ordenes?id=' + id);
  }



  addPO(purchaseOrder: PurchasOrder): Observable<PurchasOrder> {

    return this.http.post<PurchasOrder>(this.URL_API+'/ordenes', purchaseOrder);
  }

  deletePO(id: number): Observable<PurchasOrder> {

    return this.http.delete<PurchasOrder>(this.URL_API +"/ordenes/"+id )
  }

  updatePO(purchaseOrder: PurchasOrder): Observable<any> {

    return this.http.put(this.URL_API+"/ordenes/"+purchaseOrder.id, purchaseOrder)
}




}
