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
import com.bootcamp.Integrador.models.ContactInfo;
import com.bootcamp.Integrador.models.SupplierCategory;
import com.bootcamp.Integrador.services.ContactInfoService;
import com.bootcamp.Integrador.services.SupplierCategoryService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/contactinfo") // localhost:8080/tareas
public class ContactInfoController {

	@Autowired
	ContactInfoService  contactInfoService;
	
	@GetMapping()
	public ResponseEntity<List<ContactInfo>> getContactInfos() {
		return ResponseEntity.ok(contactInfoService.getContactInfos());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<ContactInfo>> geContactInfoById(@PathVariable Integer id) {
		return ResponseEntity.ok(contactInfoService.getContactInfoById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateContactInfo(@PathVariable int id, @RequestBody ContactInfo contactInfo) {
		return ResponseEntity.ok(contactInfoService.updateContactInfo(id, contactInfo));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ContactInfo> deleteContactInfo(@PathVariable int id) {
		if(contactInfoService.getContactInfoById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(contactInfoService.recoverContactInfo(id));
		}else {
			return ResponseEntity.ok(contactInfoService.deleteContactInfo(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createContactInfo(@Valid @RequestBody ContactInfo contactInfo, BindingResult bindingResult) {
		
		
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(contactInfoService.createContactInfo(contactInfo));
	}
}
