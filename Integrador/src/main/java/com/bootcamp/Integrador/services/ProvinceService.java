package com.bootcamp.Integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Product;
import com.bootcamp.Integrador.models.Province;

import com.bootcamp.Integrador.repositories.ProvinceRepository;

import jakarta.transaction.Transactional;

@Service
public class ProvinceService {

	@Autowired
	ProvinceRepository provinceRepository;
	
	public List<Province> getProvinces(){
		return provinceRepository.findAll();
	}
	
	public Optional<Province> getProvinceById(Integer id){
		return provinceRepository.findById(id);
	}
	
	@Transactional
	public Province createProvince(Province province) {
		Province resultProvince = provinceRepository.save(province);
		return provinceRepository.findById(resultProvince.getId()).get();
	}
	
	public String updateProvince(Integer id, Province province) {
		try {
			Province prov = provinceRepository.findById(id).get();// obtengo la tarea original
			if (prov != null) {
				prov.setName(province.getName());
				prov.setCountryId(province.getCountryId());
				provinceRepository.save(prov);
				return "Province with id: " + id + " updated successfully.";
			}
			return "Error: The province is null.";

		}catch(Exception err) {
			return "Error: The province couldn´t be found.";
		}
		
	}
	

	public Province deleteProvince(Integer id) {
		try {
			Province prov =  provinceRepository.findById(id).get();
			prov.setDeleted(true);
			provinceRepository.save(prov);
			return provinceRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public Province recoverProvince(Integer id) {
		try {
			Province prov =  provinceRepository.findById(id).get();
			prov.setDeleted(false);
			provinceRepository.save(prov);
			return provinceRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
