package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Country;
import com.bootcamp.Integrador.models.Phone;
import com.bootcamp.Integrador.repositories.CountryRepository;
import com.bootcamp.Integrador.repositories.PhoneRepository;

import jakarta.transaction.Transactional;

@Service
public class PhoneService {

	@Autowired
	PhoneRepository phoneRepository;

	public List<Phone> getPhones() {
		return phoneRepository.findAll();
	}

	public Optional<Phone> getPhoneById(Integer id) {
		return phoneRepository.findById(id);
	}

	@Transactional
	public Phone createPhone(Phone phone) {
		try {
			phone.setCreatedAt(Timestamp.from(Instant.now()));
			phone.setUpdatedAt(Timestamp.from(Instant.now()));
			phone.setDeleted(false);
			Phone resultPhone = phoneRepository.save(phone);
			return resultPhone;
		}catch(Exception e) {
			e.getMessage();
			throw e;
	}
	}

	public String updatePhone(Integer id, Phone phone) {
		try {
			Phone phn = phoneRepository.findById(id).get();// obtengo la tarea original
			if (phn != null) {
				phn.setCountry(phone.getCountry());
				phn.setPhoneNumber(phone.getPhoneNumber());
				phn.setUpdatedAt(Timestamp.from(Instant.now()));
				phoneRepository.save(phn);
				return "Phone with id: " + id + " updated successfully.";
			}
			return "Error: The phone is null.";

		} catch (Exception err) {
			return "Error: The phone couldn´t be found.";
		}

	}

	public Phone deletePhone(Integer id) {
		try {
			Phone phn =  phoneRepository.findById(id).get();
			phn.setDeleted(true);
			phoneRepository.save(phn);
			return phoneRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public Phone recoverPhone(Integer id) {
		try {
			Phone phn =  phoneRepository.findById(id).get();
			phn.setDeleted(false);
			phoneRepository.save(phn);
			return phoneRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
