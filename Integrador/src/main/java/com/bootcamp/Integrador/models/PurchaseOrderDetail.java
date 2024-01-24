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
@Table(name = "purchase_order_details")
public class PurchaseOrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;
	
	@NotBlank(message = "quantity cannot be blank")
	@NotNull(message = "quantity cannot be null")
	private Integer quantity;
	
	@NotBlank(message = "unitPrice cannot be blank")
	@NotNull(message = "unitPrice cannot be null")
	@Column(name = "unit_price")
	private double unitPrice;
	
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

	public PurchaseOrderDetail(Integer id,
			 Integer quantity,
			 double unitPrice,
			 boolean isDeleted) {

		this.id = id;
		this.quantity = quantity;
		this.unitPrice = unitPrice;
		this.isDeleted = isDeleted;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
	}
	public PurchaseOrderDetail(
			 Integer quantity,
			 double unitPrice,
			 boolean isDeleted) {


		this.quantity = quantity;
		this.unitPrice = unitPrice;
		this.isDeleted = isDeleted;
		this.createdAt = Timestamp.from(Instant.now());;
		this.updatedAt = Timestamp.from(Instant.now());;
	}
	
	public PurchaseOrderDetail() {
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
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
	
	
	
	
}
