package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.ContactInfo;
import com.bootcamp.Integrador.models.Phone;
import com.bootcamp.Integrador.models.ProductCategory;
import com.bootcamp.Integrador.repositories.ContactInfoRepository;
import com.bootcamp.Integrador.repositories.ProductCategoryRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductCategoryService {

	@Autowired
	ProductCategoryRepository productCategoryRepository;

	public List<ProductCategory> getProductCategories() {
		return productCategoryRepository.findAll();
	}

	public Optional<ProductCategory> getProductCategoryById(Integer id) {
		return productCategoryRepository.findById(id);
	}

	@Transactional
	public ProductCategory createProductCategory(ProductCategory productCategory) {
		try {
			productCategory.setCreatedAt(Timestamp.from(Instant.now()));
			productCategory.setUpdatedAt(Timestamp.from(Instant.now()));
			productCategory.setDeleted(false);
			ProductCategory resultProductCategory = productCategoryRepository.save(productCategory);
			return resultProductCategory;
		}catch(Exception e) {
			e.getMessage();
			throw e;
		}
	}

	public String updateProductCategory(Integer id, ProductCategory productCategory) {
		try {
			ProductCategory prodCat = productCategoryRepository.findById(id).get();// obtengo la tarea original
			if (prodCat != null) {
				prodCat.setName(productCategory.getName());
				prodCat.setUpdatedAt(Timestamp.from(Instant.now()));
				productCategoryRepository.save(prodCat);
				return "ProductCategory with id: " + id + " updated successfully.";
			}
			return "Error: The productCategory is null.";

		} catch (Exception err) {
			return "Error: The productCategory couldn´t be found.";
		}

	}

	public ProductCategory deleteProductCategory(Integer id) {
		try {
			ProductCategory prodCat =  productCategoryRepository.findById(id).get();
			prodCat.setDeleted(true);
			productCategoryRepository.save(prodCat);
			return productCategoryRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public ProductCategory recoverProductCategory(Integer id) {
		try {
			ProductCategory prodCat =  productCategoryRepository.findById(id).get();
			prodCat.setDeleted(false);
			productCategoryRepository.save(prodCat);
			return productCategoryRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
