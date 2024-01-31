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
import com.bootcamp.Integrador.models.SupplierCategory;
import com.bootcamp.Integrador.services.ProvinceService;
import com.bootcamp.Integrador.services.SupplierCategoryService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/suppliercategories") // localhost:8080/tareas
public class SupplierCategoryController {

	
	@Autowired
	SupplierCategoryService  supplierCategoryService;
	
	@GetMapping()
	public ResponseEntity<List<SupplierCategory>> getSupplierCategories() {
		return ResponseEntity.ok(supplierCategoryService.getSupplierCategories());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<SupplierCategory>> geSupplierCategoryById(@PathVariable Integer id) {
		return ResponseEntity.ok(supplierCategoryService.getSupplierCategoryById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateSupplierCategory(@PathVariable int id, @RequestBody SupplierCategory supplierCategory) {
		return ResponseEntity.ok(supplierCategoryService.updateSupplierCategory(id, supplierCategory));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<SupplierCategory> deleteSupplierCategory(@PathVariable int id) {
		if(supplierCategoryService.getSupplierCategoryById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(supplierCategoryService.recoverSupplierCategory(id));
		}else {
			return ResponseEntity.ok(supplierCategoryService.deleteSupplierCategory(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createSupplierCategory(@Valid @RequestBody SupplierCategory supplierCategory, BindingResult bindingResult) {
		
		
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(supplierCategoryService.createSupplierCategory(supplierCategory));
	}
}
