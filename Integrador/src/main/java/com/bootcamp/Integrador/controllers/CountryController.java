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
import com.bootcamp.Integrador.models.Country;
import com.bootcamp.Integrador.models.Province;
import com.bootcamp.Integrador.services.CountryService;
import com.bootcamp.Integrador.services.ProvinceService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/countries") // localhost:8080/tareas
public class CountryController {

	
	@Autowired
	CountryService  countryService;
	
	@GetMapping()
	public ResponseEntity<List<Country>> getCountries() {
		return ResponseEntity.ok(countryService.getCountries());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Country>> geCountryById(@PathVariable Integer id) {
		return ResponseEntity.ok(countryService.getCountryById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateCountry(@PathVariable int id, @RequestBody Country country) {
		return ResponseEntity.ok(countryService.updateCountry(id, country));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Country> deleteCountry(@PathVariable int id) {
		if(countryService.getCountryById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(countryService.recoverCountry(id));
		}else {
			return ResponseEntity.ok(countryService.deleteCountry(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createCountry(@Valid @RequestBody Country country, BindingResult bindingResult) {
		
		//pregunto si existen errores en el model
		//se puede crear una clase que haga lo mismo para todos los metodos de cada entidad y controlador. Por ej:
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(countryService.createCountry(country));
	}
}
