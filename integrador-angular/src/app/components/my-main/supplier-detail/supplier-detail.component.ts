import { Component, OnInit } from '@angular/core';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Supplier } from '../../../models/supplier';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.css'
})
export class SupplierDetailComponent implements OnInit{

s: any;
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

  constructor(public suppliersService: SuppliersServiceService, private route: ActivatedRoute) {
    this.suppliersService;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.s = this.getSupplier(params['codProv'])});
      
  }



  getSupplier(c : string){
    this.suppliersService.getSupplier(c).subscribe(res => {
      this.s = res;
      this.codProvInput  = this.s[0].codProv;
      this.razonSocialInput  = this.s[0].razonSocial;
      this.rubroInput  = this.s[0].rubro;
      this.webInput  = this.s[0].website;
      this.telefonoInput  = this.s[0].telefono;
      this.emailInput  = this.s[0].email;
      this.direccionInput  = this.s[0].direccion;
      this.cpInput  = this.s[0].cp;
      this.localidadInput = this.s[0].localidad;
      this.provinciaInput  = this.s[0].provincia;
      this.paisInput  = this.s[0].pais;
      this.cuitInput  = this.s[0].cuit;
      this.ivaInput  = this.s[0].iva;
      this.nombreContactoInput  = this.s[0].nombreContacto;
      this.apellidContactoInput  = this.s[0].apellidoContacto;
      this.telefonoContactoInput  = this.s[0].telefonoContacto;
      this.emailContactoInput  = this.s[0].emailContacto;
      this.rolContactoInput  = this.s[0].rolContacto;
    });

  }
  }




