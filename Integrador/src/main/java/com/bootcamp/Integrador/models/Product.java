package com.bootcamp.Integrador.models;

import java.sql.Timestamp;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;

	@NotBlank(message = "name cannot be blank")
	@NotNull(message = "name cannot be null")
	private String name;

	@NotBlank(message = "sku cannot be blank")
	@NotNull(message = "sku cannot be null")
	@Column(unique = true, nullable = false)
	private String sku;

	private String description;

	@NotBlank(message = "price cannot be blank")
	@NotNull(message = "price cannot be null")
	private double price;

	@Column(name = "img_url")
	private String imgUrl;
	
	@NotBlank(message = "isDeleted cannot be blank")
	@NotNull(message = "isDeleted cannot be null")
	@Column(name = "is_deleted")
	private boolean isDeleted;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	
	@Column(name = "product_category_id")
	private ProductCategory categoryId;
	
	
	@Column(name = "supplier_id")
	private Supplier supplier_id;

	public Product(Integer id, String name, String sku, String description, double price, String imgUrl,
			ProductCategory categoryId, Supplier supplier_id) {

		this.id = id;
		this.name = name;
		this.sku = sku;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.categoryId = categoryId;
		this.supplier_id = supplier_id;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.isDeleted = false;
	}

	public Product(String name, String sku, String description, double price, String imgUrl, ProductCategory categoryId,
			Supplier supplier_id) {

		this.name = name;
		this.sku = sku;
		this.description = description;
		this.price = price;
		this.imgUrl = imgUrl;
		this.categoryId = categoryId;
		this.supplier_id = supplier_id;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.isDeleted = false;
	}

	public Product() {
	}

	
	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public Timestamp getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Timestamp updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public ProductCategory getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(ProductCategory categoryId) {
		this.categoryId = categoryId;
	}

	public Supplier getSupplier_id() {
		return supplier_id;
	}

	public void setSupplier_id(Supplier supplier_id) {
		this.supplier_id = supplier_id;
	}

}
