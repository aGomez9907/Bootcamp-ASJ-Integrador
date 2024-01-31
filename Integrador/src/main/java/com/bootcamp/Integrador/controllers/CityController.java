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
import com.bootcamp.Integrador.models.City;
import com.bootcamp.Integrador.services.AddressService;
import com.bootcamp.Integrador.services.CityService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/cities") // localhost:8080/tareas
public class CityController {

	
	@Autowired
	CityService  cityService;
	
	@GetMapping()
	public ResponseEntity<List<City>> getCities() {
		return ResponseEntity.ok(cityService.getCities());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<City>> geCityById(@PathVariable Integer id) {
		return ResponseEntity.ok(cityService.getCityById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateCity(@PathVariable int id, @RequestBody City city) {
		return ResponseEntity.ok(cityService.updateCity(id, city));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<City> deleteCity(@PathVariable int id) {
		if(cityService.getCityById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(cityService.recoverCity(id));
		}else {
			return ResponseEntity.ok(cityService.deleteCity(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createCity(@Valid @RequestBody City city, BindingResult bindingResult) {
		
		//pregunto si existen errores en el model
		//se puede crear una clase que haga lo mismo para todos los metodos de cada entidad y controlador. Por ej:
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(cityService.createCity(city));
	}
}
