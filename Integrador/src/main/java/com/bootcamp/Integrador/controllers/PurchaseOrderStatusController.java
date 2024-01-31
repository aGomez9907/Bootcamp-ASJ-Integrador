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
import com.bootcamp.Integrador.models.PurchaseOrderStatus;
import com.bootcamp.Integrador.models.SupplierCategory;
import com.bootcamp.Integrador.services.PurchaseOrderStatusService;
import com.bootcamp.Integrador.services.SupplierCategoryService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/purchaseorderstatuses") // localhost:8080/tareas
public class PurchaseOrderStatusController {
	
	@Autowired
	PurchaseOrderStatusService  purchaseOrderStatusService;
	
	@GetMapping()
	public ResponseEntity<List<PurchaseOrderStatus>> getPurchaseOrderStatuses() {
		return ResponseEntity.ok(purchaseOrderStatusService.getPurchaseOrderStatuses());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<PurchaseOrderStatus>> gePurchaseOrderStatusById(@PathVariable Integer id) {
		return ResponseEntity.ok(purchaseOrderStatusService.getPurchaseOrderStatusById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updatePurchaseOrderStatus(@PathVariable int id, @RequestBody PurchaseOrderStatus purchaseOrderStatus) {
		return ResponseEntity.ok(purchaseOrderStatusService.updatePurchaseOrderStatus(id, purchaseOrderStatus));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<PurchaseOrderStatus> deletePurchaseOrderStatus(@PathVariable int id) {
		if(purchaseOrderStatusService.getPurchaseOrderStatusById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(purchaseOrderStatusService.recoverPurchaseOrderStatus(id));
		}else {
			return ResponseEntity.ok(purchaseOrderStatusService.deletePurchaseOrderStatus(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createPurchaseOrderStatus(@Valid @RequestBody PurchaseOrderStatus purchaseOrderStatus, BindingResult bindingResult) {
		
		
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(purchaseOrderStatusService.createPurchaseOrderStatus(purchaseOrderStatus));
	}
}
