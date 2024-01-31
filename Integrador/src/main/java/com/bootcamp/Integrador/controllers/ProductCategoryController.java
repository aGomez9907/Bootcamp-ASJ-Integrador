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
import com.bootcamp.Integrador.models.ProductCategory;
import com.bootcamp.Integrador.models.Province;
import com.bootcamp.Integrador.services.ProductCategoryService;
import com.bootcamp.Integrador.services.ProvinceService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/productcategories") // localhost:8080/tareas
public class ProductCategoryController {

	@Autowired
	ProductCategoryService  productCategoryService;
	
	@GetMapping()
	public ResponseEntity<List<ProductCategory>> getProductCategories() {
		return ResponseEntity.ok(productCategoryService.getProductCategories());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<ProductCategory>> geProductCategoryById(@PathVariable Integer id) {
		return ResponseEntity.ok(productCategoryService.getProductCategoryById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProductCategory(@PathVariable int id, @RequestBody ProductCategory productCategory) {
		return ResponseEntity.ok(productCategoryService.updateProductCategory(id, productCategory));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ProductCategory> deleteProductCategory(@PathVariable int id) {
		if(productCategoryService.getProductCategoryById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(productCategoryService.recoverProductCategory(id));
		}else {
			return ResponseEntity.ok(productCategoryService.deleteProductCategory(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createProductCategory(@Valid @RequestBody ProductCategory productCategory, BindingResult bindingResult) throws Exception {
		
		//pregunto si existen errores en el model
		//se puede crear una clase que haga lo mismo para todos los metodos de cada entidad y controlador. Por ej:
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(productCategoryService.createProductCategory(productCategory));
	}
}
