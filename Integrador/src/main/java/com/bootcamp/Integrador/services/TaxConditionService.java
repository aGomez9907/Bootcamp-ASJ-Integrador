package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Supplier;
import com.bootcamp.Integrador.models.TaxCondition;

import com.bootcamp.Integrador.repositories.TaxConditionRepository;

import jakarta.transaction.Transactional;

@Service
public class TaxConditionService {

	
	@Autowired
	TaxConditionRepository taxConditionRepository;

	public List<TaxCondition> getTaxConditions() {
		return taxConditionRepository.findAll();
	}

	public Optional<TaxCondition> getTaxConditionById(Integer id) {
		return taxConditionRepository.findById(id);
	}

	@Transactional
	public TaxCondition createTaxCondition(TaxCondition taxCondition) {
		try {
			taxCondition.setCreatedAt(Timestamp.from(Instant.now()));
			taxCondition.setUpdatedAt(Timestamp.from(Instant.now()));
			taxCondition.setDeleted(false);
			TaxCondition resultTaxCondition = taxConditionRepository.save(taxCondition);
			return resultTaxCondition;
		}catch(Exception e) {
			e.getMessage();
			throw e;
		}
	}

	public String updateTaxCondition(Integer id, TaxCondition taxCondition) {
		try {
			TaxCondition taxCond = taxConditionRepository.findById(id).get();// obtengo la tarea original
			if (taxCond != null) {
				taxCond.setName(taxCondition.getName());
				taxCond.setUpdatedAt(Timestamp.from(Instant.now()));
				taxConditionRepository.save(taxCond);
				return "TaxCondition with id: " + id + " updated successfully.";
			}
			return "Error: The taxCondition is null.";

		} catch (Exception err) {
			return "Error: The taxCondition couldn´t be found.";
		}

	}

	public TaxCondition deleteTaxCondition(Integer id) {
		try {
			TaxCondition taxCond =  taxConditionRepository.findById(id).get();
			taxCond.setDeleted(true);
			taxConditionRepository.save(taxCond);
			return taxConditionRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public TaxCondition recoverTaxCondition(Integer id) {
		try {
			TaxCondition taxCond =  taxConditionRepository.findById(id).get();
			taxCond.setDeleted(false);
			taxConditionRepository.save(taxCond);
			return taxConditionRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
