import { Component, OnInit } from '@angular/core';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Supplier} from '../../../models/supplier';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { NgForm } from '@angular/forms';
import { Iva } from '../../../../enum/iva-condition';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  suppliers: Array<Supplier> = new Array();
  suppliersAux: Array<Supplier> = new Array();
  iva = Object.entries(Iva).map(([key, value]) => ({ key, value }));

  idInput: number = 0;
  codProvInput: string = '';
  razonSocialInput: string = '';
  rubroInput: string = '';
  webInput: string = '';
  telefonoInput: number = NaN;
  emailInput: string = '';
  direccionInput: string = '';
  cpInput: string = '';
  localidadInput: string = '';
  provinciaInput: string = '';
  paisInput: string = '';
  cuitInput: string = '';
  ivaInput: string = '';
  nombreContactoInput: string = '';
  apellidContactoInput: string = '';
  telefonoContactoInput: number = NaN;
  emailContactoInput: string = '';
  rolContactoInput: string = '';

  searchInput: string = '';

  

  constructor(public suppliersService: SuppliersServiceService, private modalService: NgbModal) {
    this.suppliersService;
  }
  ngOnInit(): void {
    this.getSuppliers();
  }

  URL_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';



  resetFields() {
    this.idInput = 0;
    this.codProvInput = '';
    this.razonSocialInput = '';
    this.rubroInput = '';
    this.webInput = '';
    this.telefonoInput = NaN;
    this.emailInput = '';
    this.direccionInput = '';
    this.cpInput = '';
    this.localidadInput = '';
    this.provinciaInput = '';
    this.paisInput = '';
    this.cuitInput = '';
    this.ivaInput = '';
    this.nombreContactoInput = '';
    this.apellidContactoInput = '';
    this.telefonoContactoInput = NaN;
    this.emailContactoInput = '';
    this.rolContactoInput = '';
  }

  imageNotFound(event: Event) {
    (event.target as HTMLImageElement).src = this.URL_IMG;
  }

  /*------------------CRUD--------------------*/

  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((res) => {
      this.suppliers = res;
      this.suppliersAux = this.suppliers;
      this.filterActive()
    });
  }

  addSupplier(form: NgForm) {
    if (form.valid) {
      this.suppliersService.addSupplier(form.value).subscribe((res) => {
        console.log(res);
        this.getSuppliers();
        this.resetFields();
      });
    }
  }

  deleteSupplier(id: any) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    let sup = this.suppliers.find((sup)=> sup.id == id)
    modalRef.componentInstance.id = sup?.codProv;
    modalRef.componentInstance.entity = "supplier"
    if(sup!= undefined && sup.deleted == true){
      modalRef.componentInstance.deletionType = "restoration"
      modalRef.componentInstance.restoreOrDelete = "restore"
    }else{
      modalRef.componentInstance.deletionType = "deletion"
      modalRef.componentInstance.restoreOrDelete = "delete"
    }
    
    modalRef.result.then((result)=>{
      if(result === 'confirm'){
        this.suppliersService.deleteSupplier(id).subscribe((res) => {
          console.log(res);
          this.getSuppliers();
        });
      }
    })
      

  }

 /*------------------Auxiliar functions--------------------*/

  search() {
    if(this.searchInput === ''){
      this.suppliersAux = this.suppliers
    }else{
      this.suppliersAux = this.suppliers.filter(sup => sup.legalName.toLowerCase().includes(this.searchInput.toLowerCase()) || sup.codProv.toLowerCase().includes(this.searchInput.toLowerCase()));
    }
    console.log(this.suppliersAux);
    console.log(this.searchInput);
  }

  filterDeleted(){
    this.suppliersAux = this.suppliers.filter(sup=> sup.deleted == true)
  }

  filterActive(){
    this.suppliersAux = this.suppliers.filter(sup=> sup.deleted == false)
  }

  sortSuppliers(criteria: string, order: 'asc' | 'desc') {
    const compareFn = (a: any, b: any) => {
      if (order === 'asc') {
        return a[criteria] > b[criteria] ? 1 : -1;
      } else {
        return a[criteria] < b[criteria] ? 1 : -1;
      }
    };
    this.suppliersAux.sort(compareFn);
  }
}
