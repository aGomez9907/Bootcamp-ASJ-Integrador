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
import com.bootcamp.Integrador.models.PurchaseOrderDetail;
import com.bootcamp.Integrador.services.PurchaseOrderDetailService;
import com.bootcamp.Integrador.services.PurchaseOrderService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/purchaseorderdetails") // localhost:8080/tareas
public class PurchaseOrderDetailController {

	@Autowired
	PurchaseOrderDetailService  purchaseOrderDetailService;
	
	@GetMapping()
	public ResponseEntity<List<PurchaseOrderDetail>> getPurchaseOrderDetails() {
		return ResponseEntity.ok(purchaseOrderDetailService.getPurchaseOrderDetails());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<PurchaseOrderDetail>> gePurchaseOrderDetailById(@PathVariable Integer id) {
		return ResponseEntity.ok(purchaseOrderDetailService.getPurchaseOrderDetailById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updatePurchaseOrderDetail(@PathVariable int id, @RequestBody PurchaseOrderDetail purchaseOrderDetail) {
		return ResponseEntity.ok(purchaseOrderDetailService.updatePurchaseOrderDetail(id, purchaseOrderDetail));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<PurchaseOrderDetail> deletePurchaseOrderDetail(@PathVariable int id) {
		if(purchaseOrderDetailService.getPurchaseOrderDetailById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(purchaseOrderDetailService.recoverPurchaseOrderDetail(id));
		}else {
			return ResponseEntity.ok(purchaseOrderDetailService.deletePurchaseOrderDetail(id));
		}
	}
	
	@PostMapping()
	@Transactional
	public ResponseEntity<Object> createPurchaseOrderDetail(@Valid @RequestBody PurchaseOrderDetail purchaseOrderDetail, BindingResult bindingResult) {
		
		
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(purchaseOrderDetailService.createPurchaseOrderDetail(purchaseOrderDetail));
	}
}
