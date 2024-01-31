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
import com.bootcamp.Integrador.models.City;
import com.bootcamp.Integrador.models.Province;
import com.bootcamp.Integrador.services.CityService;
import com.bootcamp.Integrador.services.ProvinceService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/provinces") // localhost:8080/tareas
public class ProvinceController {

	

	
	@Autowired
	ProvinceService  provinceService;
	
	@GetMapping()
	public ResponseEntity<List<Province>> getProvinces() {
		return ResponseEntity.ok(provinceService.getProvinces());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Province>> geProvinceById(@PathVariable Integer id) {
		return ResponseEntity.ok(provinceService.getProvinceById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProvince(@PathVariable int id, @RequestBody Province province) {
		return ResponseEntity.ok(provinceService.updateProvince(id, province));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Province> deleteProvince(@PathVariable int id) {
		if(provinceService.getProvinceById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(provinceService.recoverProvince(id));
		}else {
			return ResponseEntity.ok(provinceService.deleteProvince(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createProvince(@Valid @RequestBody Province province, BindingResult bindingResult) {
		
		//pregunto si existen errores en el model
		//se puede crear una clase que haga lo mismo para todos los metodos de cada entidad y controlador. Por ej:
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(provinceService.createProvince(province));
	}
}
