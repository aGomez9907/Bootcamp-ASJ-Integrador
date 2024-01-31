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
import com.bootcamp.Integrador.models.Address;
import com.bootcamp.Integrador.services.AddressService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/addresses") // localhost:8080/tareas
public class AddressController {

	@Autowired
	AddressService  addressService;
	
	@GetMapping()
	public ResponseEntity<List<Address>> getAddresses() {
		return ResponseEntity.ok(addressService.getAddresses());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Address>> geAddressById(@PathVariable Integer id) {
		return ResponseEntity.ok(addressService.getAddressById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateAddress(@PathVariable int id, @RequestBody Address address) {
		return ResponseEntity.ok(addressService.updateAddress(id, address));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Address> deleteAddress(@PathVariable int id) {
		if(addressService.getAddressById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(addressService.recoverAddress(id));
		}else {
			return ResponseEntity.ok(addressService.deleteAddress(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createAddress(@Valid @RequestBody Address address, BindingResult bindingResult) {

		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(addressService.createAddress(address));
	}
}
