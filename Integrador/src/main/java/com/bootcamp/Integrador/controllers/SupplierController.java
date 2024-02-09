package com.bootcamp.Integrador.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.Integrador.handlers.ErrorHandler;
import com.bootcamp.Integrador.models.Province;
import com.bootcamp.Integrador.models.Supplier;
import com.bootcamp.Integrador.services.ProvinceService;
import com.bootcamp.Integrador.services.SupplierService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/suppliers") // localhost:8080/tareas
public class SupplierController {

	@Autowired
	SupplierService  supplierService;
	
	@GetMapping()
	public ResponseEntity<List<Supplier>> getSuppliers() {
		return ResponseEntity.ok(supplierService.getSuppliers());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Supplier>> geSupplierById(@PathVariable Integer id) {
		return ResponseEntity.ok(supplierService.getSupplierById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<Supplier> updateSupplier(@PathVariable int id, @RequestBody Supplier supplier) throws Exception {
		return ResponseEntity.ok(supplierService.updateSupplier(id, supplier));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Supplier> deleteSupplier(@PathVariable int id) {
		if(supplierService.getSupplierById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(supplierService.recoverSupplier(id));
		}else {
			return ResponseEntity.ok(supplierService.deleteSupplier(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createSupplier(@Valid @RequestBody Supplier supplier, BindingResult bindingResult) {
		
	
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(supplierService.createSupplier(supplier));
	}
}
