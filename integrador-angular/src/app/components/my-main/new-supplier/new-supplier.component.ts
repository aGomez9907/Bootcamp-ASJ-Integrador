import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import {
  TaxCondition,
  Supplier,
  SupplierCategory,
  Country,
  Province,
} from '../../../models/supplier';


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

  ivas: Array<TaxCondition> = new Array();

  suppliers: Array<Supplier> = new Array();
  countries: Array<Country> = new Array();
  provinces: Array<Province> = new Array();
  provincesToShow: Array<Province> = new Array();

  successMessage: string | null = null;
  errorMessage: string | null = null;

  categories: Array<SupplierCategory> = new Array();

  currentSupplier: Supplier = {
    legalName: '',
    codProv: '',
    webSite: null,
    email: '',
    cuit: '',
    urlLogo: null,
    categoryId: {
      id: 0,
      name: '',
      deleted: false,
    },
    taxConditionId: {
      id: 0,
    },
    phoneId: {
      id: 0,
      country: '',
      phoneNumber: '',
    },
    addressId: {
      id: 0,
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
      id: 0,
      firstName: '',
      lastName: '',
      phoneId: {
        id: 0,
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
    this.validForm = this.validateForm();
    console.log(this.validateForm());

    if (this.validForm) {
      if (this.isUpdating) {
        this.supplierService
          .updateSupplier(this.currentSupplier)
          .subscribe(
            (res) => (this.successMessage = 'Supplier updated successfully')
          );
      } else {

        this.supplierService
          .addSupplier(this.currentSupplier)
          .subscribe(
            (res) => (this.successMessage = 'Supplier created successfully')
          );
      }
    }
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
      this.categories = res.filter((cat) => cat.deleted == false);
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
      this.currentSupplier.categoryId.id == 0 ||
      !this.validateWebSite(this.currentSupplier.webSite) ||
      !this.validatePhoneCountry(this.currentSupplier.phoneId.country) ||
      !this.validateEmail(this.currentSupplier.email) ||
      !this.validateWebSite(this.currentSupplier.urlLogo) ||
      this.currentSupplier.addressId.number == 0 ||
      !this.validatePostCode(this.currentSupplier.addressId.postcode) ||
      this.currentSupplier.addressId.provinceId.countryId.id == 0 ||
      this.currentSupplier.addressId.provinceId.id == 0 ||
      !this.validateCuit(this.currentSupplier.cuit) ||
      this.currentSupplier.taxConditionId.id == 0 ||
      !this.validatePhoneCountry(
        this.currentSupplier.contactInfoId.phoneId.country
      ) ||
      !this.validateEmail(this.currentSupplier.contactInfoId.email)
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
    //const regex = /^(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z]{4,12}$/;
    const regex2 = /^[a-zA-Z0-9]{4,12}$/;

    return regex2.test(strng);
  }

  validatePhoneCountry(strng: string): boolean {
    const regex = /^\+\d{1,4}$/;

    return regex.test(strng);
  }

  validateEmail(strng: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(strng);
  }

  validateWebSite(strng: string | undefined) {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    if (strng != undefined && strng != '') {
      return regex.test(strng);
    } else {
      return true;
    }
  }

  validatePostCode(strng: string): boolean {
    const regex = /^[0-9]{4,8}$/;

    return regex.test(strng);
  }
  validateCuit(strng: string): boolean {
    const regex = /^\d{2}-\d{8}-\d{1}$/;
    console.log(this.currentSupplier.cuit);
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

    countryCode = countryCode.replace(/\D/g, '');

    if (!countryCode.startsWith('+')) {
      countryCode = '+' + countryCode;
    }

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

  onCuitChange(event: any) {
    let inputValue = event.target.value;
    // Eliminar caracteres no numéricos del valor del CUIT
    inputValue = inputValue.replace(/\D/g, '');

    // Aplicar el formato del CUIT (xx-xxxxxxxx-x)
    if (inputValue.length > 2) {
      inputValue = inputValue.substring(0, 2) + '-' + inputValue.substring(2);
    }
    if (inputValue.length > 11) {
      inputValue =
        inputValue.substring(0, 11) + '-' + inputValue.substring(11, 12);
    }
    this.currentSupplier.cuit = inputValue; // Actualizar el ngModel con el valor formateado
  }
}
