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
@Table(name = "purchase_orders")
public class PurchaseOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;
	
	@NotBlank(message = "OrderNumber cannot be blank")
	@NotNull(message = "OrderNumber cannot be null")
	@Column(unique = true, nullable = false, name = "order_number")
	private Integer orderNumber;
	
	@NotBlank(message = "deliveryDate cannot be blank")
	@NotNull(message = "deliveryDate cannot be null")
	@Column(name = "delivery_date")
	private Timestamp deliveryDate;
	
	@NotBlank(message = "emissionDate cannot be blank")
	@NotNull(message = "emissionDate cannot be null")
	@Column(name = "emission_date")
	private Timestamp emissionDate;
	
	@NotBlank(message = "isDeleted cannot be blank")
	@NotNull(message = "isDeleted cannot be null")
	@Column(name = "is_deleted")
	private boolean isDeleted; 
	
	private String description;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	
	
	
	@Column(name = "status_id")
	private PurchaseOrderStatus statusId;
	
	@Column(name = "supplier_id")
	private Supplier supplierId;

	public PurchaseOrder(Integer id,
			 Integer orderNumber,
			 Timestamp deliveryDate,
			 Timestamp emissionDate,
			 boolean isDeleted,
			String description, PurchaseOrderStatus statusId,
			Supplier supplierId) {

		this.id = id;
		this.orderNumber = orderNumber;
		this.deliveryDate = deliveryDate;
		this.emissionDate = emissionDate;
		this.isDeleted = isDeleted;
		this.description = description;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.statusId = statusId;
		this.supplierId = supplierId;
	}
	public PurchaseOrder(
			 Integer orderNumber,
			 Timestamp deliveryDate,
			 Timestamp emissionDate,
			 boolean isDeleted,
			String description, PurchaseOrderStatus statusId,
			Supplier supplierId) {


		this.orderNumber = orderNumber;
		this.deliveryDate = deliveryDate;
		this.emissionDate = emissionDate;
		this.isDeleted = isDeleted;
		this.description = description;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.statusId = statusId;
		this.supplierId = supplierId;
	}
	public PurchaseOrder() {

	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getOrderNumber() {
		return orderNumber;
	}
	public void setOrderNumber(Integer orderNumber) {
		this.orderNumber = orderNumber;
	}
	public Timestamp getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(Timestamp deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public Timestamp getEmissionDate() {
		return emissionDate;
	}
	public void setEmissionDate(Timestamp emissionDate) {
		this.emissionDate = emissionDate;
	}
	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
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
	public PurchaseOrderStatus getStatusId() {
		return statusId;
	}
	public void setStatusId(PurchaseOrderStatus statusId) {
		this.statusId = statusId;
	}
	public Supplier getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(Supplier supplierId) {
		this.supplierId = supplierId;
	}
	
	
	
	
	
	
	
}
