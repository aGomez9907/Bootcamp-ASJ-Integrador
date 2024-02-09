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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "contact_info")
public class ContactInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;
	@NotBlank(message = "Firstname cannot be blank")
	@NotNull(message = "Firstname cannot be null")
	@Column(name = "first_name")
	private String firstName;
	@NotBlank(message = "Lastname cannot be blank")
	@NotNull(message = "Lastname cannot be null")
	@Column(name = "last_name")
	private String lastName;
	
//	@NotBlank(message = "isDeleted cannot be blank")
	@NotNull(message = "isDeleted cannot be null")
	@Column(name = "is_deleted")
	private boolean isDeleted;

	@NotBlank(message = "Email cannot be blank")
	@NotNull(message = "Email cannot be null")
	@Pattern(regexp="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message="Invalid email")
	@Column(name = "email")
	private String email;
	@NotBlank(message = "ContactRole cannot be blank")
	@NotNull(message = "ContactRole cannot be null")
	@Column(name = "contact_role")
	private String contactRole;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	
	
	//FK
	//@NotBlank(message = "phoneId cannot be blank")
	@NotNull(message = "phoneId cannot be null")
	//@JoinColumn(name = "phone_id")
	@OneToOne(fetch = FetchType.EAGER)
	private Phone phone;

	public ContactInfo(Integer id, String firstName, String lastName, Phone phoneId, String email, String contactRole) {

		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phoneId;
		this.email = email;
		this.contactRole = contactRole;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.isDeleted = false;
	}

	public ContactInfo(String firstName, String lastName, Phone phoneId, String email, String contactRole) {

		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phoneId;
		this.email = email;
		this.contactRole = contactRole;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.isDeleted = false;
	}

	public ContactInfo() {

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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Phone getPhoneId() {
		return phone;
	}

	public void setPhoneId(Phone phoneId) {
		this.phone = phoneId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactRole() {
		return contactRole;
	}

	public void setContactRole(String contactRole) {
		this.contactRole = contactRole;
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
