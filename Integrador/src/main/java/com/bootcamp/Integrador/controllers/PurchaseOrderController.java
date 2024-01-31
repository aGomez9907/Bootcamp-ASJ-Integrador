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
import com.bootcamp.Integrador.models.PurchaseOrder;
import com.bootcamp.Integrador.models.PurchaseOrderStatus;
import com.bootcamp.Integrador.services.PurchaseOrderService;
import com.bootcamp.Integrador.services.PurchaseOrderStatusService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/purchaseorders") // localhost:8080/tareas
public class PurchaseOrderController {

	@Autowired
	PurchaseOrderService  purchaseOrderService;
	
	@GetMapping()
	public ResponseEntity<List<PurchaseOrder>> getPurchaseOrders() {
		return ResponseEntity.ok(purchaseOrderService.getPurchaseOrders());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<PurchaseOrder>> gePurchaseOrderById(@PathVariable Integer id) {
		return ResponseEntity.ok(purchaseOrderService.getPurchaseOrderById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updatePurchaseOrder(@PathVariable int id, @RequestBody PurchaseOrder purchaseOrder) {
		return ResponseEntity.ok(purchaseOrderService.updatePurchaseOrder(id, purchaseOrder));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<PurchaseOrder> deletePurchaseOrder(@PathVariable int id) {
		if(purchaseOrderService.getPurchaseOrderById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(purchaseOrderService.recoverPurchaseOrder(id));
		}else {
			return ResponseEntity.ok(purchaseOrderService.deletePurchaseOrder(id));
		}
	}
	
	@PostMapping()
	@Transactional
	public ResponseEntity<Object> createPurchaseOrder(@Valid @RequestBody PurchaseOrder purchaseOrder, BindingResult bindingResult) {
		
		
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(purchaseOrderService.createPurchaseOrder(purchaseOrder));
	}
}
