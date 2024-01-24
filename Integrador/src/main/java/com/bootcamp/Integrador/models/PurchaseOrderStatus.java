package com.bootcamp.Integrador.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "purchase_order_statuses")
public class PurchaseOrderStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;
	@NotBlank(message = "status cannot be blank")
	@NotNull(message = "status cannot be null")
	private String status;

	public PurchaseOrderStatus(Integer id, String status) {

		this.id = id;
		this.status = status;
	}

	public PurchaseOrderStatus(String status) {

		this.status = status;
	}

	public PurchaseOrderStatus() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
