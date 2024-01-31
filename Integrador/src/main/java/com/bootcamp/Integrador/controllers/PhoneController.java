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
import com.bootcamp.Integrador.models.Phone;
import com.bootcamp.Integrador.models.Province;
import com.bootcamp.Integrador.services.PhoneService;
import com.bootcamp.Integrador.services.ProvinceService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/phones") // localhost:8080/tareas
public class PhoneController {

	@Autowired
	PhoneService  phoneService;
	
	@GetMapping()
	public ResponseEntity<List<Phone>> getPhones() {
		return ResponseEntity.ok(phoneService.getPhones());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Phone>> gePhoneById(@PathVariable Integer id) {
		return ResponseEntity.ok(phoneService.getPhoneById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updatePhone(@PathVariable int id, @RequestBody Phone phone) {
		return ResponseEntity.ok(phoneService.updatePhone(id, phone));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Phone> deletePhone(@PathVariable int id) {
		if(phoneService.getPhoneById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(phoneService.recoverPhone(id));
		}else {
			return ResponseEntity.ok(phoneService.deletePhone(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createPhone(@Valid @RequestBody Phone phone, BindingResult bindingResult) {
		
		//pregunto si existen errores en el model
		//se puede crear una clase que haga lo mismo para todos los metodos de cada entidad y controlador. Por ej:
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(phoneService.createPhone(phone));
	}
}
