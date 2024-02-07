import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchasOrder, Status } from '../models/purchase-order';
import { Observable } from 'rxjs';
import { PurchaseOrderDetail } from '../models/purchase-order-detail';

@Injectable({
  providedIn: 'root'
})
export class POServiceService {

  constructor(private http: HttpClient) { }

  URL_API = 'http://localhost:8080'


  getPOs(): Observable<PurchasOrder[]> {
    
    return this.http.get<PurchasOrder[]>(this.URL_API+'/purchaseorders');

  }

  getDetails(POid: string):Observable<PurchaseOrderDetail[]>{
    return this.http.get<PurchaseOrderDetail[]>(this.URL_API+'/purchaseorderdetails/order/'+ POid)
  }

  getStatuses():Observable<Status[]>{
    return this.http.get<Status[]>(this.URL_API+"/purchaseorderstatuses")
  }

  getPO(id : string): Observable<PurchasOrder> {

    return this.http.get<PurchasOrder>(this.URL_API+'/purchaseorders/' + id);
  }



  addPO(purchaseOrder: PurchasOrder): Observable<PurchasOrder> {

    return this.http.post<PurchasOrder>(this.URL_API+'/purchaseorders', purchaseOrder);
  }

  addDetail(detail: PurchaseOrderDetail): Observable<PurchaseOrderDetail>{
    return this.http.post<PurchaseOrderDetail>(this.URL_API+"/purchaseorderdetails", detail)
  }

  deletePO(id: number): Observable<PurchasOrder> {

    return this.http.delete<PurchasOrder>(this.URL_API +"/purchaseorders/"+id )
  }

  updatePO(purchaseOrder: PurchasOrder): Observable<any> {

    return this.http.put(this.URL_API+"/purchaseorders/"+purchaseOrder.id, purchaseOrder)
}




}
