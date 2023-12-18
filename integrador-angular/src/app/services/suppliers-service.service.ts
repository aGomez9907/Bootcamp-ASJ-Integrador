import { Injectable } from '@angular/core';
import { proveedores } from '../data/proveedores';
import { Supplier } from '../models/supplier';

const dataProveedores = proveedores;

@Injectable({
  providedIn: 'root',
})
export class SuppliersServiceService {
  data: any;
  constructor() {
    this.data = dataProveedores;
  }

  getSuppliers() {
    return this.data;
  }

  addSupplier(supplier: Supplier) {
    if (!this.data.find((sup: Supplier) => sup.id === supplier.id)) {
      this.data.push(supplier);
      return true;
    } else {
      return false;
    }
  }

  deleteSupplier(id: number) {
    let supplier = this.data.find((s: Supplier) => s.id === id);
    if (supplier) {
      this.data.splice(
        this.data.findIndex((s: Supplier) => s.id == id),
        1
      );
    } else {
      console.log(`id ${id} not found`);
    }
  }

  updateSupplier(supplier: Supplier) {
    let updateIndex = this.data.findIndex(
      (s: Supplier) => s.id === supplier.id
    );
    this.data.splice(updateIndex, 1);
    this.data.push(supplier);
  }
}
