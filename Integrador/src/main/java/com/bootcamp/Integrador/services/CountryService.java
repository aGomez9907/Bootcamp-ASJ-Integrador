package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.ContactInfo;
import com.bootcamp.Integrador.models.Country;
import com.bootcamp.Integrador.repositories.ContactInfoRepository;
import com.bootcamp.Integrador.repositories.CountryRepository;

import jakarta.transaction.Transactional;

@Service
public class CountryService {

	@Autowired
	CountryRepository countryRepository;

	public List<Country> getCountries() {
		return countryRepository.findAll();
	}

	public Optional<Country> getCountryById(Integer id) {
		return countryRepository.findById(id);
	}

	@Transactional
	public Country createCountry(Country country) {
		Country resultCountry = countryRepository.save(country);
		return resultCountry;
	}

	public String updateCountry(Integer id, Country country) {
		try {
			Country countr = countryRepository.findById(id).get();// obtengo la tarea original
			if (countr != null) {
				countr.setName(country.getName());
				countryRepository.save(countr);
				return "Country with id: " + id + " updated successfully.";
			}
			return "Error: The country is null.";

		} catch (Exception err) {
			return "Error: The country couldn´t be found.";
		}

	}

	public Country deleteCountry(Integer id) {
		try {
			Country countr =  countryRepository.findById(id).get();
			countr.setDeleted(true);
			countryRepository.save(countr);
			return countryRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public Country recoverCountry(Integer id) {
		try {
			Country countr =  countryRepository.findById(id).get();
			countr.setDeleted(false);
			countryRepository.save(countr);
			return countryRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
