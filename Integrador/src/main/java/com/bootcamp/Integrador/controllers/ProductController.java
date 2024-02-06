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
import com.bootcamp.Integrador.models.Product;
import com.bootcamp.Integrador.models.ProductCategory;
import com.bootcamp.Integrador.services.ProductCategoryService;
import com.bootcamp.Integrador.services.ProductService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/products") // localhost:8080/tareas
public class ProductController {

	@Autowired
	ProductService  productService;
	
	@GetMapping()
	public ResponseEntity<List<Product>> getProducts() {
		return ResponseEntity.ok(productService.getProducts());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Product>> geProductById(@PathVariable Integer id) {
		return ResponseEntity.ok(productService.getProductById(id));
	}
	
	@GetMapping("/sup/{id}")
	public ResponseEntity<List<Product>> getActiveProductsBySupplierId(@PathVariable Integer id) {
		return ResponseEntity.ok(productService.getActiveProductsBySupplierId(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product product) {
		return ResponseEntity.ok(productService.updateProduct(id, product));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Product> deleteProduct(@PathVariable int id) {
		if(productService.getProductById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(productService.recoverProduct(id));
		}else {
			return ResponseEntity.ok(productService.deleteProduct(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createProduct(@Valid @RequestBody Product product, BindingResult bindingResult) throws Exception {
		
		//pregunto si existen errores en el model
		//se puede crear una clase que haga lo mismo para todos los metodos de cada entidad y controlador. Por ej:
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(productService.createProduct(product));
	}
}
