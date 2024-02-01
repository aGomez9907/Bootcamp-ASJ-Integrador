package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Address;
import com.bootcamp.Integrador.repositories.AddressRepository;

import jakarta.transaction.Transactional;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;
//	@Autowired
//	ProvinceService provinceService; 
	
	public List<Address> getAddresses(){
		return addressRepository.findAll();
	}
	
	public Optional<Address> getAddressById(Integer id){
		return addressRepository.findById(id);
	}
	
	@Transactional
	public Address createAddress(Address address) {
		try {
			address.setCreatedAt(Timestamp.from(Instant.now()));
			address.setUpdatedAt(Timestamp.from(Instant.now()));
			address.setDeleted(false);
			Address resultAddress = addressRepository.save(address);
			return resultAddress;
		}catch(Exception e) {
			e.getMessage();
			throw e;
		}
	
	}
	
	public String updateAddress(Integer id, Address address) {
		try {
			Address addrs = addressRepository.findById(id).get();// obtengo la tarea original
			if (addrs != null) {
				addrs.setCity(address.getCity());
				addrs.setProvinceId(address.getProvinceId());
				addrs.setCreatedAt(address.getCreatedAt());
				addrs.setNumber(address.getNumber());
				addrs.setPostcode(address.getPostcode());
				addrs.setUpdatedAt(Timestamp.from(Instant.now()));
				addressRepository.save(addrs);
				return "Address with id: " + id + " updated successfully.";
			}
			return "Error: The address is null.";

		}catch(Exception err) {
			return "Error: The address couldn´t be found.";
		}
		
	}
	

	public Address deleteAddress(Integer id) {
		try {
			Address addrs = addressRepository.findById(id).get();
			addrs.setDeleted(true);
			addressRepository.save(addrs);
			return addressRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public Address recoverAddress(Integer id) {
		try {
			Address addrs = addressRepository.findById(id).get();
			addrs.setDeleted(false);
			addressRepository.save(addrs);
			return addressRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	
	
	
}
