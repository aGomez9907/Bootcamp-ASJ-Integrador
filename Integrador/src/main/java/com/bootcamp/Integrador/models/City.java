package com.bootcamp.Integrador.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "cities")
public class City {

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
	//@NotBlank(message = "provinceId cannot be blank")
	@NotNull(message = "provinceId cannot be null")
	//@JoinColumn(name = "id")
	@ManyToOne(fetch = FetchType.EAGER)
	private Province province;

	public City(Integer id, String name, Province provinceId) {

		this.id = id;
		this.name = name;
		this.province = provinceId;
		this.isDeleted = false;
	}

	public City(String name, Province provinceId) {

		this.name = name;
		this.province = provinceId;
		this.isDeleted = false;
	}

	public City() {

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Province getProvinceId() {
		return province;
	}

	public void setProvinceId(Province provinceId) {
		this.province = provinceId;
	}

}
