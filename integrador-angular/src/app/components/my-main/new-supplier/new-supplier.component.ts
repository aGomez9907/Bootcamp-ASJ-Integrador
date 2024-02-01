import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private supplierService: SuppliersServiceService,
    private router: Router
  ) {}

  isUpdating: boolean = false;
  isDetails: boolean = false;

  initialCodProv: String = '';
  initialCuit: String = '';

  existsCodProv: boolean = false;
  existsCuit: boolean = false;
  validForm: boolean = true;
  showbadCountryCode1: boolean = false;
  showbadCountryCode2: boolean = false;
  //ivas = ['IVA Responsable Inscripto','IVA Sujeto Exento','Responsable Monotributo','Proveedor del Exterior','Otro'];
  ivas: Array<TaxCondition> = new Array();

  suppliers: Array<Supplier> = new Array();
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let id = response.get('id');
      this.isUpdating = this.router.url.includes('update');
      this.isDetails = this.router.url.includes('details');

      if (id != undefined && this.isUpdating) {
        this.supplierService.getSupplier(id).subscribe((res) => {
          this.currentSupplier = res;
          this.initialCodProv = this.currentSupplier.codProv;
          this.initialCuit = this.currentSupplier.cuit;
        });
      } else if (id != undefined && this.isDetails) {
        this.supplierService.getSupplier(id).subscribe((res) => {
          this.currentSupplier = res;
        });
      }
    });

    this.getSuppliers();
    this.getCategories();
    this.getCountries();
    this.getProvinces();
    this.getTaxConditions();
  }

  saveSupplier(): void {
    // this.validForm = this.validateForm();
    // if (this.validForm) {
      if (this.isUpdating) {
        this.supplierService.updateSupplier(this.currentSupplier).subscribe();
      } else {
        //this.currentSupplier.deleted = false;
        this.supplierService.addSupplier(this.currentSupplier).subscribe();
      }
    // }
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe((res) => {
      this.suppliers = res;
      console.log(res);
    });
  }

  getCountries() {
    this.supplierService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  getProvinces() {
    this.supplierService.getProvinces().subscribe((res) => {
      this.provinces = res;
      if (this.isUpdating || this.isDetails) {
        this.onSelectCountry();
      }
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

  onSelectCountry() {
    let country: Country = this.currentSupplier.addressId.provinceId.countryId;
    //console.log(country)
    // console.log(this.currentSupplier);
    // console.log(this.provinces);
    this.provincesToShow = this.provinces.filter(
      (prov) => prov.countryId.id == country.id
    );
  }

  validateForm(): boolean {
    if (
      !this.validateStringOf4Digits(this.currentSupplier.codProv) ||
      !this.validateStringBetweeen3And50(this.currentSupplier.legalName) ||
      !this.validatePhoneCountry(this.currentSupplier.phoneId.country)||
      !this.validateEmail(this.currentSupplier.email)||
      !this.validateUrl(this.currentSupplier.urlLogo)||
      !this.validateCuit(this.currentSupplier.cuit)||
      !this.validatePostCode(this.currentSupplier.addressId.postcode)
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateStringBetweeen3And50(strng: string): boolean {
    const regex = /^[0-9 A-Z a-z]{3,50}$/;
    return regex.test(strng);
  }

  validateStringOf4Digits(strng: string) {
    const regex = /^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z]{4,12}$/;
    return regex.test(strng);
  }

  validatePhoneCountry(strng: string) {
    const regex = /^\+\d{1-4}+$/;
    return regex.test(strng);
  }

  validateEmail(strng: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(strng);
  }

  validateUrl(strng: string | undefined): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (typeof strng !== 'undefined'){
      return regex.test(strng);
    }else{
      return true;
    }
  }

  validatePostCode(strng: string): boolean {
    const regex = /^[0-9]{4,8}$/;
    return regex.test(strng);
  }
  validateCuit(strng: string): boolean {
    const regex = /^\d{2}-\d{8}-\d{1}$/;
    return regex.test(strng);
  }

  supplierCodeExists(): void {
    if (this.initialCodProv !== this.currentSupplier.codProv) {
      this.existsCodProv = this.suppliers.some(
        (sup: Supplier) => sup.codProv === this.currentSupplier.codProv
      );
    }
  }

  cuitExists(): void {
    if (this.initialCuit !== this.currentSupplier.cuit) {
      this.existsCuit = this.suppliers.some(
        (sup: Supplier) => sup.cuit === this.currentSupplier.cuit
      );
    }
  }

  validateCountryCode(field: number) {
    let countryCode: string = '';
    let showError: boolean;

    if (field === 1) {
      countryCode = this.currentSupplier.phoneId.country;
    } else if (field === 2) {
      countryCode = this.currentSupplier.contactInfoId.phoneId.country;
    }

    if (!countryCode.startsWith('+')) {
      countryCode = '+' + countryCode;
    }

    countryCode = countryCode.replace(/\D/g, '');

    // Check if there are letters in the country code
    showError = /[a-zA-Z]/.test(countryCode);
    // console.log(countryCode)
    // console.log(countryCode)

    if (field === 1) {
      this.currentSupplier.phoneId.country = countryCode;
      this.showbadCountryCode1 = showError;
    } else if (field === 2) {
      this.currentSupplier.contactInfoId.phoneId.country = countryCode;
      this.showbadCountryCode2 = showError;
    }
  }
}
