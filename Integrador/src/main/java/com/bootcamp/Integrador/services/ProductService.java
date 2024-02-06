package com.bootcamp.Integrador.services;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.Integrador.models.Product;
import com.bootcamp.Integrador.models.ProductCategory;
import com.bootcamp.Integrador.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;

	public List<Product> getProducts() {
		return productRepository.findAll();
	}

	public Optional<Product> getProductById(Integer id) {
		return productRepository.findById(id);
	}

	public List<Product> getActiveProductsBySupplierId(Integer id) {
		return productRepository.findActiveProductsBySupplierId(id);
	}
	
	@Transactional
	public Product createProduct(Product product) {
		try {
			product.setCreatedAt(Timestamp.from(Instant.now()));
			product.setUpdatedAt(Timestamp.from(Instant.now()));
			product.setDeleted(false);
			Product resultProduct = productRepository.save(product);
			return resultProduct;
		}catch(Exception e) {
			throw e;
		}
	}

	public String updateProduct(Integer id, Product product) {
		try {
			Product prod = productRepository.findById(id).get();// obtengo la tarea original
			if (prod != null) {
				prod.setCategoryId(product.getCategoryId());
				prod.setDescription(product.getDescription());
				prod.setImgUrl(product.getImgUrl());
				prod.setName(product.getName());
				prod.setPrice(product.getPrice());
				prod.setSku(product.getSku());
				prod.setSupplierId(product.getSupplierId());
				prod.setUpdatedAt(Timestamp.from(Instant.now()));
				productRepository.save(prod);
				return "Product with id: " + id + " updated successfully.";
			}
			return "Error: The product is null.";

		} catch (Exception err) {
			return "Error: The product couldn´t be found.";
		}

	}

	public Product deleteProduct(Integer id) {
		try {
			Product prod =  productRepository.findById(id).get();
			prod.setDeleted(true);
			productRepository.save(prod);
			return productRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
	public Product recoverProduct(Integer id) {
		try {
			Product prod =  productRepository.findById(id).get();
			prod.setDeleted(false);
			productRepository.save(prod);
			return productRepository.findById(id).get();
		} catch (Exception err) {
			err.getMessage();
		}
		return null;
	}
}
