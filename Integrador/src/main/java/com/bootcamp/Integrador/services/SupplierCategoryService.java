package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.PurchaseOrderDetail;
import com.bootcamp.Integrador.models.PurchaseOrderStatus;
import com.bootcamp.Integrador.models.SupplierCategory;
import com.bootcamp.Integrador.repositories.PurchaseOrderDetailRepository;
import com.bootcamp.Integrador.repositories.SupplierCategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class SupplierCategoryService {

	@Autowired
	SupplierCategoryRepository supplierCategoryRepository;

	public List<SupplierCategory> getSupplierCategories() {
		return supplierCategoryRepository.findAll();
	}

	public Optional<SupplierCategory> getSupplierCategoryById(Integer id) {
		return supplierCategoryRepository.findById(id);
	}

	@Transactional
	public SupplierCategory createSupplierCategory(SupplierCategory supplierCategory) {
		try {
			supplierCategory.setCreatedAt(Timestamp.from(Instant.now()));
			supplierCategory.setUpdatedAt(Timestamp.from(Instant.now()));
			supplierCategory.setDeleted(false);
			SupplierCategory resultSupplierCategory = supplierCategoryRepository.save(supplierCategory);
			return resultSupplierCategory;
		}catch(Exception e) {
			e.getMessage();
			throw e;
		}
		
	}

	public String updateSupplierCategory(Integer id, SupplierCategory supplierCategory) {
		try {
			SupplierCategory suppCat = supplierCategoryRepository.findById(id).get();// obtengo la tarea original
			if (suppCat != null) {
				suppCat.setName(supplierCategory.getName());
				suppCat.setUpdatedAt(Timestamp.from(Instant.now()));
				supplierCategoryRepository.save(suppCat);
				return "SupplierCategory with id: " + id + " updated successfully.";
			}
			return "Error: The supplierCategory is null.";

		} catch (Exception err) {
			return "Error: The supplierCategory couldn´t be found.";
		}

	}

	public SupplierCategory deleteSupplierCategory(Integer id) {
		try {
			SupplierCategory suppCat =  supplierCategoryRepository.findById(id).get();
			suppCat.setDeleted(true);
			supplierCategoryRepository.save(suppCat);
			return supplierCategoryRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public SupplierCategory recoverSupplierCategory(Integer id) {
		try {
			SupplierCategory suppCat =  supplierCategoryRepository.findById(id).get();
			suppCat.setDeleted(false);
			supplierCategoryRepository.save(suppCat);
			return supplierCategoryRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
