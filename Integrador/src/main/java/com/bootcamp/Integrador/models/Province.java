package com.bootcamp.Integrador.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
//	@NotBlank(message = "isDeleted cannot be blank")
	@NotNull(message = "isDeleted cannot be null")
	@Column(name = "is_deleted")
	private boolean isDeleted;
	

	//FK
	//@NotBlank(message = "countryId cannot be blank")
	@NotNull(message = "countryId cannot be null")
	//@JoinColumn(name = "country_id")
	@ManyToOne(fetch=FetchType.EAGER)
	private Country country;

	public Province(Integer id, String name, Country countryId) {

		this.id = id;
		this.name = name;
		this.country = countryId;
		this.isDeleted = false;
	}

	public Province(String name, Country countryId) {

		this.name = name;
		this.country = countryId;
		this.isDeleted = false;
	}

	public Province() {
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

	public Country getCountryId() {
		return country;
	}

	public void setCountryId(Country countryId) {
		this.country = countryId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
