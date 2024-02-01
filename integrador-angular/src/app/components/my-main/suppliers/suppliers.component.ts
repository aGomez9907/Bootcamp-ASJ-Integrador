import { Component, OnInit } from '@angular/core';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Supplier, Country, Province } from '../../../models/supplier';
import { NgForm } from '@angular/forms';
import { Iva } from '../../../../enum/iva-condition';



// interface Provinces {
//   [country: string]: string[];
// }


@Component({ 
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  suppliers: Array<Supplier> = new Array();
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








  constructor(public suppliersService: SuppliersServiceService) {
    this.suppliersService;
  }
  ngOnInit(): void {
    this.getSuppliers();
    console.log(this.suppliers)
    
  }

  URL_IMG= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"


  // countries = ['Argentina', 'Chile', 'Brazil'];


  // provinces: Provinces = {
  //   'Argentina': [
  //     'Buenos Aires', 'Cordoba', 'Santa Fe', 'Mendoza', 'Tucuman',
  //     'Entre Rios', 'Salta', 'Chaco', 'Corrientes', 'Santiago del Estero',
  //     'Jujuy', 'La Pampa', 'Formosa', 'Misiones', 'San Juan', 'San Luis',
  //     'Catamarca', 'La Rioja', 'Tierra del Fuego', 'Neuquen', 'Rio Negro', 'Chubut'
  //   ],
  //   'Chile': [
  //     'Santiago', 'Valparaiso', 'Concepcion', 'Antofagasta', 'Araucania',
  //     'Coquimbo', 'Magallanes', 'Los Lagos', 'Atacama', 'Tarapaca',
  //     'Aysen', 'Los Rios', 'Maule', 'O\'Higgins'
  //   ],
  //   'Brazil': [
  //     'Sao Paulo', 'Rio de Janeiro', 'Brasilia', 'Minas Gerais', 'Bahia',
  //     'Rio Grande do Sul', 'Parana', 'Ceara', 'Pernambuco', 'Amazonas',
  //     'Santa Catarina', 'Goias', 'Para', 'Maranhao', 'Espirito Santo',
  //     'Paraiba', 'Rio Grande do Norte', 'Alagoas', 'Piaui', 'Acre', 'Tocantins',
  //     'Rondonia', 'Sergipe'
  //   ]
  // };











  // loadUpdate(s: Supplier) {
  //   this.idInput = s.id;
  //   this.codProvInput  = s.codProv;
  //   this.razonSocialInput  = s.razonSocial;
  //   this.rubroInput  = s.rubro;
  //   this.webInput  = s.website;
  //   this.telefonoInput  = s.telefono;
  //   this.emailInput  = s.email;
  //   this.direccionInput  = s.direccion;
  //   this.cpInput  = s.cp;
  //   this.localidadInput = s.localidad;
  //   this.provinciaInput  = s.provincia;
  //   this.paisInput  = s.pais;
  //   this.cuitInput  = s.cuit;
  //   this.ivaInput  = s.iva;
  //   this.nombreContactoInput  = s.nombreContacto;
  //   this.apellidContactoInput  = s.apellidoContacto;
  //   this.telefonoContactoInput  = s.telefonoContacto;
  //   this.emailContactoInput  = s.emailContacto;
  //   this.rolContactoInput  = s.rolContacto;
  //   console.log("id:"+this.idInput)
  // }

  resetFields() {
    this.idInput = 0;
    this.codProvInput  = '';
    this.razonSocialInput  = '';
    this.rubroInput  = '';
    this.webInput  = '';
    this.telefonoInput  = NaN;
    this.emailInput  = '';
    this.direccionInput  = '';
    this.cpInput  = '';
    this.localidadInput = '';
    this.provinciaInput  = '';
    this.paisInput  = '';
    this.cuitInput  = '';
    this.ivaInput  = '';
    this.nombreContactoInput  = '';
    this.apellidContactoInput  = '';
    this.telefonoContactoInput  = NaN;
    this.emailContactoInput  = '';
    this.rolContactoInput  = '';
  }










  imageNotFound(event: Event){
    (event.target as HTMLImageElement).src = this.URL_IMG;
  }


/*------------------CRUD--------------------*/


  getSuppliers(){
    this.suppliersService.getSuppliers().subscribe(res => {
      this.suppliers = res;
      console.log(res)
    });

  }


  addSupplier(form: NgForm) {
    if(form.valid){
      this.suppliersService.addSupplier(form.value).subscribe(res =>{
        console.log(res);
        this.getSuppliers();
        this.resetFields();
      })}
    }



  deleteSupplier(id: any) {
    let confirmacion = confirm('¿Desea eliminar el proveedor #' + id + '?');
    if (confirmacion) {
      this.suppliersService.deleteSupplier(id).subscribe(res=>{
        console.log(res);
        this.getSuppliers();
      })
    }
  }


  updateSupplier(form: NgForm) {
    // let s = {
    //   codProv: this.codProvInput,
    //   razonSocial: this.razonSocialInput,
    //   rubro: this.rubroInput,
    //   website: this.webInput,
    //   telefono: this.telefonoInput,
    //   email: this.emailInput,
    //   direccion: this.direccionInput,
    //   cp: this.cuitInput,
    //   localidad: this.localidadInput,
    //   provincia: this.provinciaInput,
    //   pais: this.paisInput,
    //   cuit: this.cuitInput,
    //   iva: this.ivaInput,
    //   nombreContacto: this.nombreContactoInput,
    //   apellidoContacto: this.apellidContactoInput,
    //   telefonoContacto: this.telefonoContactoInput,
    //   emailContacto: this.emailContactoInput,
    //   rolContacto: this.rolContactoInput,
    // };
    console.log(form.value)

    this.suppliersService.updateSupplier(form.value).subscribe(res => {
      console.log(res);
      this.resetFields();
      this.getSuppliers();
    });
  }


}
