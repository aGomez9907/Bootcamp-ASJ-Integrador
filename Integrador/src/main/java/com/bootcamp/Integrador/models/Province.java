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
@Table(name = "provinces")
public class Province {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;
	@NotBlank(message = "name cannot be blank")
	@NotNull(message = "name cannot be null")
	private String name;

	private Country countryId;

	public Province(Integer id, String name, Country countryId) {

		this.id = id;
		this.name = name;
		this.countryId = countryId;
	}

	public Province(String name, Country countryId) {

		this.name = name;
		this.countryId = countryId;
	}

	public Province() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Country getCountryId() {
		return countryId;
	}

	public void setCountryId(Country countryId) {
		this.countryId = countryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
