import { Component, OnInit } from '@angular/core';
import { POServiceService } from '../../../services/po-service.service';
import { PurchasOrder } from '../../../models/purchase-order';
import { NgForm } from '@angular/forms';
import { Supplier } from '../../../models/supplier';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent implements OnInit{

  purchaseOrders: Array<PurchasOrder> = new Array();
  
  supAux: Supplier = {
        "id": -1,
        "codProv": "",
        "razonSocial": "",
        "rubro": "",
        "website": "",
        "telefono": -1,
        "email": "",
        "direccion": "",
        "cp": "",
        "localidad": "",
        "provincia": "",
        "pais": "",
        "iva": "",
        "cuit": "",
        "nombreContacto": "",
        "apellidoContacto": "",
        "telefonoContacto": -1,
        "emailContacto": "",
        "rolContacto": ""
      };


  idInput: number = 0;
  numberInput: number = 0;
  emissionInput: string = '';
  deliveryInput: string = '';
  infoInput: string = '';
  supplierInput: Supplier = this.supAux;
  productsInput: Product[] = new Array();
  



  
  constructor(public poService: POServiceService){
   
  }

  ngOnInit(): void {
    this.getPOs();
    console.log(this.purchaseOrders)
  }




  resetFields() {

  }





    getPOs(){
      this.poService.getPOs().subscribe(res => {
        this.purchaseOrders = res;
        console.log(res)
      });
  
    }
  
    addPO(form: NgForm) {
      console.log(form.value)
      if(form.valid){
        this.poService.addPO(form.value).subscribe(res =>{
          console.log(res);
          this.getPOs();
        })}
      }
  
  
  
    deletePO(id: number) {
      let confirmacion = confirm('¿Desea eliminar el proveedor #' + id + '?');
      if (confirmacion) {
        this.poService.deletePO(id).subscribe(res=>{
          console.log(res);
          this.getPOs();
        })
      }
    }
  
  
    updatePO(form: NgForm) {
      
      this.poService.updatePO(form.value).subscribe(res => {
        console.log(res);
        this.getPOs();
      });
    }
  

}
