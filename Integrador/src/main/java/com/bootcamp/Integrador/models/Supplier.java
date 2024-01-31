package com.bootcamp.Integrador.models;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "suppliers")
public class Supplier {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Integer id;

	@NotBlank(message = "legalName cannot be blank")
	@NotNull(message = "legalName cannot be null")
	@Column(name = "legal_name")
	private String legalName;

	@NotBlank(message = "codProv cannot be blank")
	@NotNull(message = "codProv cannot be null")
	@Column(unique = true, nullable = false, name = "cod_prov")
	private String codProv;

	@NotBlank(message = "Email cannot be blank")
	@NotNull(message = "Email cannot be null")
	@Column(name = "email")
	private String email;

	@Column(name = "web_site")
	private String webSite;

	@NotBlank(message = "cuit cannot be blank")
	@NotNull(message = "cuit cannot be null")
	@Column(unique = true, nullable = false, name = "cuit")
	private String cuit;

//	@NotBlank(message = "isDeleted cannot be blank")
	@NotNull(message = "isDeleted cannot be null")
	@Column(name = "is_deleted")
	private boolean isDeleted;

	@Column(name = "url_logo")
	private String urlLogo;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at")
	private Timestamp createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at")
	private Timestamp updatedAt;

	
	
	//FK
	//@NotBlank(message = "phoneId cannot be blank")
	@NotNull(message = "phoneId cannot be null")
	@OneToOne(fetch=FetchType.EAGER)
	//@JoinColumn(name = "phone_id")
	private Phone phone;

	//@NotBlank(message = "addressId cannot be blank")
	@NotNull(message = "addressId cannot be null")
	@OneToOne(fetch=FetchType.EAGER)
	//@JoinColumn(name = "address_id")
	private Address address;

//	@NotBlank(message = "categoryId cannot be blank")
	@NotNull(message = "categoryId cannot be null")
	@ManyToOne(fetch=FetchType.EAGER)
	//@JoinColumn(name = "supplier_category_id")
	private SupplierCategory category;

//	@NotBlank(message = "taxConditionId cannot be blank")
	@NotNull(message = "taxConditionId cannot be null")
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "tax_condition_id")
	private TaxCondition taxCondition;

//	@NotBlank(message = "contactInfoId cannot be blank")
	@NotNull(message = "contactInfoId cannot be null")
	@OneToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "contact_info_id")
	private ContactInfo contactInfo;
	
//	@OneToMany(fetch = FetchType.EAGER)
//	private List<Product>  products;

	public Supplier(Integer id, String legalName, String codProv, String email, String webSite, String cuit,
			 String urlLogo, Phone phoneId,
			Address addressId, SupplierCategory categoryId, TaxCondition taxConditionId, ContactInfo contactInfoId) {

		this.id = id;
		this.legalName = legalName;
		this.codProv = codProv;
		this.email = email;
		this.webSite = webSite;
		this.cuit = cuit;
		this.isDeleted = false;
		this.urlLogo = urlLogo;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.phone = phoneId;
		this.address = addressId;
		this.category = categoryId;
		this.taxCondition = taxConditionId;
		this.contactInfo = contactInfoId;
	}

	public Supplier(String legalName, String codProv, String email, String webSite, String cuit,
			String urlLogo, Phone phoneId, Address addressId,
			SupplierCategory categoryId, TaxCondition taxConditionId, ContactInfo contactInfoId) {

		this.legalName = legalName;
		this.codProv = codProv;
		this.email = email;
		this.webSite = webSite;
		this.cuit = cuit;
		this.isDeleted = false;
		this.urlLogo = urlLogo;
		this.createdAt = Timestamp.from(Instant.now());
		this.updatedAt = Timestamp.from(Instant.now());
		this.phone = phoneId;
		this.address = addressId;
		this.category = categoryId;
		this.taxCondition = taxConditionId;
		this.contactInfo = contactInfoId;
	}

	public Supplier() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLegalName() {
		return legalName;
	}

	public void setLegalName(String legalName) {
		this.legalName = legalName;
	}

	public String getCodProv() {
		return codProv;
	}

	public void setCodProv(String codProv) {
		this.codProv = codProv;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWebSite() {
		return webSite;
	}

	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}

	public String getCuit() {
		return cuit;
	}

	public void setCuit(String cuit) {
		this.cuit = cuit;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getUrlLogo() {
		return urlLogo;
	}

	public void setUrlLogo(String urlLogo) {
		this.urlLogo = urlLogo;
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

	public Phone getPhoneId() {
		return phone;
	}

	public void setPhoneId(Phone phoneId) {
		this.phone = phoneId;
	}

	public Address getAddressId() {
		return address;
	}

	public void setAddressId(Address addressId) {
		this.address = addressId;
	}

	public SupplierCategory getCategoryId() {
		return category;
	}

	public void setCategoryId(SupplierCategory categoryId) {
		this.category = categoryId;
	}

	public TaxCondition getTaxConditionId() {
		return taxCondition;
	}

	public void setTaxConditionId(TaxCondition taxConditionId) {
		this.taxCondition = taxConditionId;
	}

	public ContactInfo getContactInfoId() {
		return contactInfo;
	}

	public void setContactInfoId(ContactInfo contactInfoId) {
		this.contactInfo = contactInfoId;
	}

	

}
