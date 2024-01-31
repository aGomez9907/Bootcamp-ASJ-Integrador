package com.bootcamp.Integrador.handlers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.validation.BindingResult;

public class ErrorHandler {

	public Map<String,String> validateInputs(BindingResult bindingResult) {
		Map<String, String> errors = new HashMap<String, String>();
	
		if (bindingResult.hasErrors()) {
			bindingResult.getFieldErrors().forEach((error) ->{
				String errorField = error.getField();
				String errorMsg = error.getDefaultMessage();
				errors.put(errorField, errorMsg);
			});
		}
		return errors;

	}
	
	public List<String> validarInputsConSalidaString(BindingResult bindingResult){
		List<String> errors = new ArrayList<String>();
		if (bindingResult.hasErrors()) {
			bindingResult.getFieldErrors().forEach((error) ->{
				String errorMsg = error.getDefaultMessage();
				errors.add(errorMsg);
			});
		}
		return errors;

}
}
