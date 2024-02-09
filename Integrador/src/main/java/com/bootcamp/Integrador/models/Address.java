package com.bootcamp.Integrador.models;

import java.sql.Timestamp;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "addresses")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;
	@NotBlank(message = "street cannot be blank")
	@NotNull(message = "street cannot be null")
	private String street;
	//@NotBlank(message = "Number cannot be blank")
	@NotNull(message = "Number cannot be null")
	private Integer number;
	@NotBlank(message = "postcode cannot be blank")
	@NotNull(message = "postcode cannot be null")
	@Pattern(regexp="^[0-9]{4,8}$", message="PostCode must be numeric between 4 to 8 characters")
	private String postcode;
	//@NotBlank(message = "isDeleted cannot be blank")
	@NotNull(message = "isDeleted cannot be null")
	@Column(name = "is_deleted")
	private boolean isDeleted;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	
	private String city;

	//@NotBlank(message = "provinceId cannot be blank")
	@NotNull(message = "provinceId cannot be null")
	//@JoinColumn(name = "city_id")
	@ManyToOne(fetch=FetchType.EAGER)
	private Province province;



	public Address(Integer id, String city, String street, Integer number, String postcode, Province provinceId) {

		this.province = provinceId;
		this.id = id;
		this.city = city;
		this.street = street;
		this.number = number;
		this.postcode = postcode;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.isDeleted = false;
	}

	public Address(String city, String street, Integer number, String postcode, Province provinceId) {
		
		this.province = provinceId;
		this.city = city;
		this.street = street;
		this.number = number;
		this.postcode = postcode;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.isDeleted = false;
	}

	public Address() {

	}

	
	
	public Province getProvinceId() {
		return province;
	}

	public void setProvinceId(Province provinceId) {
		this.province = provinceId;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
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
