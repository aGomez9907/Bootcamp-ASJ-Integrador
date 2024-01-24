package com.bootcamp.Integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Address;
import com.bootcamp.Integrador.repositories.AddressRepository;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;
	
	public List<Address> getAddresses(){
		return addressRepository.findAll();
	}
	
	public Optional<Address> getAddressById(Integer id){
		return addressRepository.findById(id);
	}
	
	public Address createAddress(Address address) {
		Address resultAddress = addressRepository.save(address);
		return resultAddress;
	}
	
	public String updateAddress(Integer id, Address address) {
		try {
			Address addrs = addressRepository.findById(id).get();// obtengo la tarea original
			if (addrs != null) {
				addrs.setCityId(address.getCityId());
				addrs.setCreatedAt(address.getCreatedAt());
				addrs.setNumber(address.getNumber());
				addrs.setPostcode(address.getPostcode());
				addrs.setUpdatedAt(address.getUpdatedAt());
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
			Address addressToReturn = addressRepository.findById(id).get();
			addressRepository.deleteById(id);
			return addressToReturn;
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	
}
