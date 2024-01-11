import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Supplier } from '../../../models/supplier';
import { ProductCategory } from '../../../../enum/category-products';

interface Provinces {
  [country: string]: string[];
}
@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrl: './new-supplier.component.css',
})
export class NewSupplierComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private supplierService: SuppliersServiceService
  ) {}

  countries = ['Argentina', 'Chile', 'Brazil'];

  provinces: Provinces = {
    'Argentina': [
      'Buenos Aires', 'Cordoba', 'Santa Fe', 'Mendoza', 'Tucuman',
      'Entre Rios', 'Salta', 'Chaco', 'Corrientes', 'Santiago del Estero',
      'Jujuy', 'La Pampa', 'Formosa', 'Misiones', 'San Juan', 'San Luis',
      'Catamarca', 'La Rioja', 'Tierra del Fuego', 'Neuquen', 'Rio Negro', 'Chubut'
    ],
    'Chile': [
      'Santiago', 'Valparaiso', 'Concepcion', 'Antofagasta', 'Araucania',
      'Coquimbo', 'Magallanes', 'Los Lagos', 'Atacama', 'Tarapaca',
      'Aysen', 'Los Rios', 'Maule', 'O\'Higgins'
    ],
    'Brazil': [
      'Sao Paulo', 'Rio de Janeiro', 'Brasilia', 'Minas Gerais', 'Bahia',
      'Rio Grande do Sul', 'Parana', 'Ceara', 'Pernambuco', 'Amazonas',
      'Santa Catarina', 'Goias', 'Para', 'Maranhao', 'Espirito Santo',
      'Paraiba', 'Rio Grande do Norte', 'Alagoas', 'Piaui', 'Acre', 'Tocantins',
      'Rondonia', 'Sergipe'
    ]
  };


  categories = Object.entries(ProductCategory).map(([key, value]) => ({ key, value })); // temporal hasta traer las categorias de proveedor desde la BD
 
  currentSupplier : Supplier = {
  legalName: '',
  category: '',
  website: '',
  phone: '',
  email: '',
  cuit: '',
  iva: 'Otro',
  address: {
    postCode: '',
    street: '',
    number: 0,
    city: '',
    province: '',
    country: '',
  },
  contact : {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: '',
  }
  }

  isUpdating: boolean = false;
  cuitList: string[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if(id != undefined){
        this.supplierService.getSupplier(id).subscribe((res) => {
          this.currentSupplier = res;
        });
        this.isUpdating = true;
      }else{
        this.supplierService.getSuppliers().subscribe((res) => {
          for (let supplier of res) {
            this.cuitList.push(supplier.cuit);
          }
        })
      }
    })
  }

  saveSupplier(): void{
    if(this.isUpdating){
      this.supplierService.updateSupplier(this.currentSupplier).subscribe();
    }else {
      this.currentSupplier.isDeleted = false;
      this.supplierService.addSupplier(this.currentSupplier).subscribe();
    }
  }

  validate(){
    //aca irian todas las validaciones
  }

  createNewCategory(){
    //con esto añadiria rubros
  }


}
