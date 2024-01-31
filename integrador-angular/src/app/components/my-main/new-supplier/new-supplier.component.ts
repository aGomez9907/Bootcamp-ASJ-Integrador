import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import {
  TaxCondition,
  Supplier,
  categoryId,
  Country,
  Province,
} from '../../../models/supplier';
import { ProductCategory } from '../../../../enum/category-products';
import { CuitFormatDirective } from '../../../directives/cuit-format.directive';

// interface Provinces {
//   [country: string]: string[];
// }
// interface City {
//   [province: string]: string[];
// }


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

  validForm: boolean = true;
  showbadCountryCode1: boolean = false;
  showbadCountryCode2:boolean = false;
  //ivas = ['IVA Responsable Inscripto','IVA Sujeto Exento','Responsable Monotributo','Proveedor del Exterior','Otro'];
  ivas: Array<TaxCondition> = new Array();

  countries: Array<Country> = new Array();
  provinces: Array<Province> = new Array();
  provincesToShow: Array<Province> = new Array();

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

  // cities: City = {
  //   "Buenos Aires":["lomas de zamora", "banfield"],
  //   "Cordoba": ["Cordoba"]};

  //categories = Object.entries(ProductCategory).map(([key, value]) => ({ key, value })); // temporal hasta traer las categorias de proveedor desde la BD

  categories: Array<categoryId> = new Array();

  currentSupplier: Supplier = {
    legalName: '',
    codProv: '',
    webSite: '',
    email: '',
    cuit: '',
    urlLogo: '',
    categoryId: {
      id: 0,
      name: '',
    },
    taxConditionId: {
      id: 0,
    },
    phoneId: {
      country: '',
      phoneNumber: '',
    },
    addressId: {
      street: '',
      number: 0,
      postcode: '',
      city: '',
      provinceId: {
        id: 0,
        name: '',
        countryId: {
          id: 0,
          name: '',
        },
      },
    },
    contactInfoId: {
      firstName: '',
      lastName: '',
      phoneId: {
        country: '',
        phoneNumber: '',
      },
      email: '',
      contactRole: '',
    },
  };

  isUpdating: boolean = false;
  cuitList: string[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      if (id != undefined) {
        this.supplierService.getSupplier(id).subscribe((res) => {
          this.currentSupplier = res;
        });
        this.isUpdating = true;
      } else {
        this.supplierService.getSuppliers().subscribe((res) => {
          for (let supplier of res) {
            this.cuitList.push(supplier.cuit);
          }
        });
      }
    });

    this.getCategories();
    this.getCountries();
    this.getProvinces();
    this.getTaxConditions();
  }

  saveSupplier(): void {
    if (this.isUpdating) {
      this.supplierService.updateSupplier(this.currentSupplier).subscribe();
    } else {
      this.currentSupplier.isDeleted = false;
      this.supplierService.addSupplier(this.currentSupplier).subscribe();
    }
  }

  getCountries() {
    this.supplierService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  getProvinces() {
    this.supplierService.getProvinces().subscribe((res) => {
      this.provinces = res;
    });
  }

  getCategories(): void {
    this.supplierService.getSupplierCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getTaxConditions() {
    this.supplierService.getTaxConditions().subscribe((res) => {
      this.ivas = res;
    });
  }
  validate() {
    //aca irian todas las validaciones
  }

  createNewCategory() {
    //con esto añadiria rubros
  }

  onSelectCountry(event: any) {
    let country = event.target.value;
    //console.log(country)
    console.log(this.currentSupplier);
    console.log(this.provinces);
    this.provincesToShow = this.provinces.filter(
      (prov) => prov.countryId.id == country
    );
  }




  // validateCountryCode(code: string, showError: boolean) {
  //   // Si el código no comienza con '+', lo agregamos automáticamente
  //   if (!code.startsWith('+')) {
  //     code = '+' + code;
  //   }

  //   // Eliminar cualquier caracter no numérico después del código del país
  //   code = code.replace(/\D/g, '');

  //   // Verificar si hay letras en el código de país
  //   showError = /[a-zA-Z]/.test(code);

  //   return { code, showError };
  // }


  validateCountryCode(field: number) {
    let countryCode: string = "";
    let showError: boolean;

    if (field === 1) {
      countryCode = this.currentSupplier.phoneId.country;
    } else if (field === 2) {
      countryCode = this.currentSupplier.contactInfoId.phoneId.country;
    }

    // If the code doesn't start with '+', add it automatically
    if (!countryCode.startsWith('+')) {
      countryCode = '+' + countryCode;
    }

    // Remove any non-numeric characters after the country code
    countryCode = countryCode.replace(/\D/g, '');

    // Check if there are letters in the country code
    showError = /[a-zA-Z]/.test(countryCode);
    console.log(countryCode)
    console.log(countryCode)

    if (field === 1) {
      this.currentSupplier.phoneId.country = countryCode;
      this.showbadCountryCode1 = showError;
    } else if (field === 2) {
      this.currentSupplier.contactInfoId.phoneId.country = countryCode;
      this.showbadCountryCode2 = showError;
    }
  }

  

  // onPhoneCountryInput(event: any, campo: number) {
  //   if (campo === 1) {
  //     const { code, showError } = this.validateCountryCode(this.currentSupplier.phoneId.country, this.showbadCountryCode1);
  //     this.currentSupplier.phoneId.country = code;
  //     this.showbadCountryCode1 = showError;
  //   } else if (campo === 2) {
  //     const { code, showError } = this.validateCountryCode(this.currentSupplier.contactInfoId.phoneId.country, this.showbadCountryCode2);
  //     this.currentSupplier.contactInfoId.phoneId.country = code;
  //     this.showbadCountryCode2 = showError;
  //   }
  // }

}
