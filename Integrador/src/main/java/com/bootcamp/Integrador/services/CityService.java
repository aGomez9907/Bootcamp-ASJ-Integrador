package com.bootcamp.Integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Address;
import com.bootcamp.Integrador.models.City;
import com.bootcamp.Integrador.repositories.CityRepository;

import jakarta.transaction.Transactional;

@Service
public class CityService {
	
	@Autowired
	CityRepository cityRepository;
	
	public List<City> getCities(){
		return cityRepository.findAll();
	}
	
	public Optional<City> getCityById(Integer id){
		return cityRepository.findById(id);
	}
	
	@Transactional
	public City createCity(City city) {
		City resultCity = cityRepository.save(city);
		return resultCity;
	}
	
	public String updateCity(Integer id, City city) {
		try {
			City cty = cityRepository.findById(id).get();// obtengo la tarea original
			if (cty != null) {
				cty.setName(city.getName());
				cty.setProvinceId(city.getProvinceId());
				cityRepository.save(cty);
				return "City with id: " + id + " updated successfully.";
			}
			return "Error: The city is null.";

		}catch(Exception err) {
			return "Error: The city couldn´t be found.";
		}
		
	}
	

	public City deleteCity(Integer id) {
		try {
			City cty = cityRepository.findById(id).get();
			cty.setDeleted(true);
			cityRepository.save(cty);
			return cityRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public City recoverCity(Integer id) {
		try {
			City cty = cityRepository.findById(id).get();
			cty.setDeleted(false);
			cityRepository.save(cty);
			return cityRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
