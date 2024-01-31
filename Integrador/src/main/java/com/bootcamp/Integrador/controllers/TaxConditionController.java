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
import com.bootcamp.Integrador.models.Province;
import com.bootcamp.Integrador.models.TaxCondition;
import com.bootcamp.Integrador.services.ProvinceService;
import com.bootcamp.Integrador.services.TaxConditionService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/taxconditions") // localhost:8080/tareas
public class TaxConditionController {

	@Autowired
	TaxConditionService  taxConditionService;
	
	@GetMapping()
	public ResponseEntity<List<TaxCondition>> getTaxConditions() {
		return ResponseEntity.ok(taxConditionService.getTaxConditions());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<TaxCondition>> geTaxConditionById(@PathVariable Integer id) {
		return ResponseEntity.ok(taxConditionService.getTaxConditionById(id));
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateTaxCondition(@PathVariable int id, @RequestBody TaxCondition taxCondition) {
		return ResponseEntity.ok(taxConditionService.updateTaxCondition(id, taxCondition));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<TaxCondition> deleteTaxCondition(@PathVariable int id) {
		if(taxConditionService.getTaxConditionById(id).get().isDeleted()==true) {
			return ResponseEntity.ok(taxConditionService.recoverTaxCondition(id));
		}else {
			return ResponseEntity.ok(taxConditionService.deleteTaxCondition(id));
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createTaxCondition(@Valid @RequestBody TaxCondition taxCondition, BindingResult bindingResult) {
		
		//pregunto si existen errores en el model
		//se puede crear una clase que haga lo mismo para todos los metodos de cada entidad y controlador. Por ej:
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorHandler().validateInputs(bindingResult);
			System.out.println(errors.toString());
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.ok(taxConditionService.createTaxCondition(taxCondition));
	}
}
