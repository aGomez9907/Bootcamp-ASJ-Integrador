package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.City;
import com.bootcamp.Integrador.models.ContactInfo;
import com.bootcamp.Integrador.repositories.CityRepository;
import com.bootcamp.Integrador.repositories.ContactInfoRepository;

import jakarta.transaction.Transactional;

@Service
public class ContactInfoService {

	@Autowired
	ContactInfoRepository contactInfoRepository;
	@Autowired
	PhoneService phoneService;
	
	public List<ContactInfo> getContactInfos() {
		return contactInfoRepository.findAll();
	}

	public Optional<ContactInfo> getContactInfoById(Integer id) {
		return contactInfoRepository.findById(id);
	}

	@Transactional
	public ContactInfo createContactInfo(ContactInfo contactInfo) {
		try {
			contactInfo.setCreatedAt(Timestamp.from(Instant.now()));
			contactInfo.setUpdatedAt(Timestamp.from(Instant.now()));
			contactInfo.setDeleted(false);
			ContactInfo resultContactInfo = contactInfoRepository.save(contactInfo);
			return resultContactInfo;
		}catch(Exception e) {
			e.getMessage();
			throw e;
		}
	}

	public String updateContactInfo(Integer id, ContactInfo contactInfo) {
		try {
			ContactInfo cinfo = contactInfoRepository.findById(id).get();// obtengo la tarea original
			if (cinfo != null) {
				cinfo.setContactRole(contactInfo.getContactRole());
				cinfo.setEmail(contactInfo.getEmail());
				cinfo.setFirstName(contactInfo.getFirstName());
				cinfo.setLastName(contactInfo.getLastName());
				this.phoneService.updatePhone(contactInfo.getPhoneId().getId(), contactInfo.getPhoneId());
				cinfo.setPhoneId(contactInfo.getPhoneId());
				cinfo.setUpdatedAt(Timestamp.from(Instant.now()));
				contactInfoRepository.save(cinfo);
				return "ContactInfo with id: " + id + " updated successfully.";
			}
			return "Error: The contactInfo is null.";

		} catch (Exception err) {
			return "Error: The contactInfo couldn´t be found.";
		}

	}

	public ContactInfo deleteContactInfo(Integer id) {
		try {
			ContactInfo cinfo = contactInfoRepository.findById(id).get();
			cinfo.setDeleted(true);
			contactInfoRepository.save(cinfo);
			return contactInfoRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public ContactInfo recoverContactInfo(Integer id) {
		try {
			ContactInfo cinfo = contactInfoRepository.findById(id).get();
			cinfo.setDeleted(false);
			contactInfoRepository.save(cinfo);
			return contactInfoRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
