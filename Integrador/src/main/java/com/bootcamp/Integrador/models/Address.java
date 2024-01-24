package com.bootcamp.Integrador.models;

import java.sql.Timestamp;

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
@Table(name = "addresses")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;
	
	private City cityId;
	@NotBlank(message = "street cannot be blank")
	@NotNull(message = "street cannot be null")
	private String street;
	@NotBlank(message = "Number cannot be blank")
	@NotNull(message = "Number cannot be null")
	private Integer number;
	@NotBlank(message = "postcode cannot be blank")
	@NotNull(message = "postcode cannot be null")
	private String postcode;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;

	public Address(Integer id, City cityId, String street, Integer number, String postcode, Timestamp createdAt,
			Timestamp updatedAt) {

		this.id = id;
		this.cityId = cityId;
		this.street = street;
		this.number = number;
		this.postcode = postcode;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Address(City cityId, String street, Integer number, String postcode, Timestamp createdAt,
			Timestamp updatedAt) {

		this.cityId = cityId;
		this.street = street;
		this.number = number;
		this.postcode = postcode;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Address() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public City getCityId() {
		return cityId;
	}

	public void setCityId(City cityId) {
		this.cityId = cityId;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
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
