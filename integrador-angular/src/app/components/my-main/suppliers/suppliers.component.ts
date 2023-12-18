import { Component, OnInit } from '@angular/core';
import { SuppliersServiceService } from '../../../services/suppliers-service.service';
import { Supplier } from '../../../models/supplier';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  suppliers: Array<Supplier> = new Array();

  idInput: number = NaN;
  razonSocialInput: string = '';
  rubroInput: string = '';
  cuitInput: string = '';
  emailInput: string = '';
  webInput: string = '';
  cpInput: string = '';
  provinciaInput: string = '';
  paisInput: string = '';
  direccionInput: string = '';
  telefonoInput: number = NaN;
  ivaInput: string = '';

  constructor(public suppliersService: SuppliersServiceService) {
    this.suppliersService;
  }
  ngOnInit(): void {
    this.suppliers = this.suppliersService.getSuppliers();
  }

  addSupplier() {
    let s = {
      id: this.idInput,
      razonSocial: this.razonSocialInput,
      rubro: this.rubroInput,
      cuit: this.cuitInput,
      email: this.emailInput,
      website: this.webInput,
      direccion: this.direccionInput,
      cp: this.cuitInput,
      provincia: this.provinciaInput,
      pais: this.paisInput,
      telefono: this.telefonoInput,
      iva: this.ivaInput,
    };

    if (this.suppliersService.addSupplier(s)) {
      this.resetFields();
    } else {
      alert('Id is already taken.');
    }
  }
  deleteSupplier(id: number) {
    this.suppliersService.deleteSupplier(id);
  }

  loadUpdate(s: Supplier) {
    this.idInput = s.id;
    this.razonSocialInput = s.razonSocial;
    this.rubroInput = s.rubro;
    this.cuitInput = s.cuit;
    this.emailInput = s.email;
    this.webInput = s.website;
    this.cpInput = s.cp;
    this.provinciaInput = s.provincia;
    this.paisInput = s.pais;
    this.direccionInput = s.direccion;
    this.telefonoInput = s.telefono;
    this.ivaInput = s.iva;
  }

  updateSupplier() {
    let s = {
      id: this.idInput,
      razonSocial: this.razonSocialInput,
      rubro: this.rubroInput,
      cuit: this.cuitInput,
      email: this.emailInput,
      website: this.webInput,
      direccion: this.direccionInput,
      cp: this.cuitInput,
      provincia: this.provinciaInput,
      pais: this.paisInput,
      telefono: this.telefonoInput,
      iva: this.ivaInput,
    };
    this.suppliersService.updateSupplier(s);
  }

  resetFields() {
    this.idInput = 0;
    this.razonSocialInput = '';
    this.rubroInput = '';
    this.cuitInput = '';
    this.emailInput = '';
    this.webInput = '';
    this.cpInput = '';
    this.provinciaInput = '';
    this.paisInput = '';
    this.direccionInput = '';
    this.telefonoInput = 0;
    this.ivaInput = '';
  }
}
