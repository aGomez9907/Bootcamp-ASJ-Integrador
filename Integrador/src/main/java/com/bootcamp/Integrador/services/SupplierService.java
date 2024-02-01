package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Phone;
import com.bootcamp.Integrador.models.Address;
import com.bootcamp.Integrador.models.ContactInfo;
import com.bootcamp.Integrador.models.PurchaseOrderStatus;
import com.bootcamp.Integrador.models.Supplier;
import com.bootcamp.Integrador.models.SupplierCategory;
import com.bootcamp.Integrador.repositories.PurchaseOrderStatusRepository;
import com.bootcamp.Integrador.repositories.SupplierRepository;

import jakarta.transaction.Transactional;

@Service
public class SupplierService {

	@Autowired
	SupplierRepository supplierRepository;
	
	@Autowired
	PhoneService phoneService;
	
	@Autowired
	AddressService addressService;
	
	@Autowired
	ContactInfoService contactInfoService;
	

	public List<Supplier> getSuppliers() {
		return supplierRepository.findAll();
	}

	public Optional<Supplier> getSupplierById(Integer id) {
		return supplierRepository.findById(id);
	}
	
	@Transactional
//	public Supplier createSupplier(Supplier supplier) {
//		try {
//			supplier.setCreatedAt(Timestamp.from(Instant.now()));
//			supplier.setUpdatedAt(Timestamp.from(Instant.now()));
//			supplier.setDeleted(false);
//			Supplier resultSupplier = supplierRepository.save(supplier);
//			return resultSupplier;
//		}catch(Exception e) {
//			e.getMessage();
//			throw e;
//		}
//	}

	public Supplier createSupplier(Supplier supplier) {
		try {
			Phone phone1 = phoneService.createPhone(supplier.getPhoneId());
			supplier.setPhoneId(phone1); 
			Address address1 = addressService.createAddress(supplier.getAddressId());
			supplier.setAddressId(address1);
			Phone phone2 = phoneService.createPhone(supplier.getContactInfoId().getPhoneId());
			supplier.getContactInfoId().setPhoneId(phone2);
			ContactInfo contactInfo1 = contactInfoService.createContactInfo(supplier.getContactInfoId());
			supplier.setContactInfoId(contactInfo1);
			
			supplier.setCreatedAt(Timestamp.from(Instant.now()));
			supplier.setUpdatedAt(Timestamp.from(Instant.now()));
			supplier.setDeleted(false);
			Supplier resultSupplier = supplierRepository.save(supplier);
			return resultSupplier;
		}catch(Exception e) {
			e.getMessage();
			throw e;
		}
	}

	public String updateSupplier(Integer id, Supplier supplier) {
		try {
			Supplier supp = supplierRepository.findById(id).get();// obtengo la tarea original
			if (supp != null) {
				this.addressService.updateAddress(supplier.getAddressId().getId(), supplier.getAddressId());
				supp.setAddressId(supplier.getAddressId());
				supp.setCategoryId(supplier.getCategoryId());
				this.contactInfoService.updateContactInfo(supplier.getContactInfoId().getId(), supplier.getContactInfoId());
				supp.setContactInfoId(supplier.getContactInfoId());
				this.phoneService.updatePhone(supplier.getPhoneId().getId(),supplier.getPhoneId());
				supp.setPhoneId(supplier.getPhoneId());
				supp.setTaxConditionId(supplier.getTaxConditionId());
				supp.setCodProv(supplier.getCodProv());
				supp.setCuit(supplier.getCuit());
				supp.setEmail(supplier.getEmail());
				supp.setLegalName(supplier.getLegalName());
				supp.setUrlLogo(supplier.getUrlLogo());
				supp.setWebSite(supplier.getWebSite());
				supp.setUpdatedAt(Timestamp.from(Instant.now()));
				supplierRepository.save(supp);
				return "Supplier with id: " + id + " updated successfully.";
			}
			return "Error: The supplier is null.";

		} catch (Exception err) {
			return "Error: The supplier couldn´t be found.";
		}

	}

	public Supplier deleteSupplier(Integer id) {
		try {
			Supplier supp =  supplierRepository.findById(id).get();
			supp.setDeleted(true);
			supplierRepository.save(supp);
			return supplierRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public Supplier recoverSupplier(Integer id) {
		try {
			Supplier supp =  supplierRepository.findById(id).get();
			supp.setDeleted(false);
			supplierRepository.save(supp);
			return supplierRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
