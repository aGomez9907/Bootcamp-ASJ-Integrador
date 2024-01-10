CREATE TABLE status
  (
     id         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     status     VARCHAR(50) NOT NULL,
     created_at DATETIME NOT NULL,
     updated_at DATETIME NULL
  );

CREATE TABLE countries
  (
     id   BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     name VARCHAR(30) NOT NULL
  );

CREATE TABLE provinces
  (
     id         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     country_id BIGINT NOT NULL,
     name       VARCHAR(30) NOT NULL
     FOREIGN KEY (country_id) REFERENCES countries (id)
  );

CREATE TABLE cities
  (
     id          BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     province_id BIGINT NOT NULL,
     name        VARCHAR(30) NOT NULL,
     FOREIGN KEY (province_id) REFERENCES provinces (id)
  );

CREATE TABLE addresses
  (
     id         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     city_id    BIGINT NOT NULL,
     street     VARCHAR(50) NOT NULL,
     number     BIGINT NOT NULL,
     postcode   VARCHAR(10) NOT NULL,
     created_at DATETIME NOT NULL,
     updated_at DATETIME NULL,
     FOREIGN KEY (city_id) REFERENCES cities (id)
  );

CREATE TABLE contact_info
  (
     id           BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     first_name   VARCHAR(50) NOT NULL,
     last_name    VARCHAR(50) NOT NULL,
     phone        VARCHAR(30) NOT NULL,
     email        VARCHAR(50) NOT NULL,
     contact_role VARCHAR(30) NOT NULL,
     created_at   DATETIME NOT NULL,
     updated_at   DATETIME NULL
  );

CREATE TABLE tax_conditions
  (
     id   BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     name VARCHAR(50) NOT NULL
  );

CREATE TABLE supplier_categories
  (
     id         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     name       VARCHAR(50) NOT NULL,
     created_at DATETIME NOT NULL,
     updated_at DATETIME NULL
  );

CREATE TABLE product_categories
  (
     id         BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     name       VARCHAR(30) NOT NULL,
     created_at DATETIME NOT NULL,
     updated_at DATETIME NULL
  );

CREATE TABLE suppliers
  (
     id               BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     address_id       BIGINT NOT NULL,
     category_id      BIGINT NOT NULL,
     tax_condition_id BIGINT NOT NULL,
     contact_info_id  BIGINT NOT NULL,
     cod_prov         VARCHAR(255) NOT NULL UNIQUE,
     legal_name       VARCHAR(50) NOT NULL,
     web_site         VARCHAR(255) NULL,
     phone            VARCHAR(30) NOT NULL,
     email            VARCHAR(50) NOT NULL,
     cuit             VARCHAR(40) NOT NULL,
	 is_deleted		  BIT NOT NULL DEFAULT 0,
     created_at       DATETIME NOT NULL,
     updated_at       DATETIME NULL
     FOREIGN KEY (address_id) REFERENCES addresses (id),
     FOREIGN KEY (category_id) REFERENCES supplier_categories (id),
     FOREIGN KEY (tax_condition_id) REFERENCES tax_conditions (id),
     FOREIGN KEY (contact_info_id) REFERENCES contact_info (id)
  );

CREATE TABLE products
  (
     id          BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     category_id BIGINT NOT NULL,
     supplier_id BIGINT NOT NULL,
     sku         VARCHAR(255) NOT NULL UNIQUE,
     name        VARCHAR(50) NOT NULL,
     description TEXT NULL,
     price       FLOAT NOT NULL,
     img_url     VARCHAR(255) NULL,
	 is_deleted  BIT NOT NULL DEFAULT 0,
     created_at  DATETIME NOT NULL,
     updated_at  DATETIME NULL,
     FOREIGN KEY (category_id) REFERENCES product_categories (id),
     FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
  );

CREATE TABLE purchase_orders
  (
     id            BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     supplier_id   BIGINT NOT NULL,
     status_id     BIGINT NOT NULL,
     order_number  BIGINT NOT NULL UNIQUE,
     emission_date DATE NOT NULL,
     delivery_date DATE NOT NULL,
     descriprion   TEXT NULL,
     created_at    DATETIME NOT NULL,
     updated_at    DATETIME NULL,
     FOREIGN KEY (status_id) REFERENCES status (id),
     FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
  );

CREATE TABLE purchase_detail
  (
     id                BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
     purchase_order_id BIGINT NOT NULL,
     product_id        BIGINT NOT NULL,
     quantity          BIGINT NOT NULL,
     unit_price        FLOAT NOT NULL,
     created_at        DATETIME NOT NULL,
     updated_at        DATETIME NULL,
     FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders (id),
     FOREIGN KEY (product_id) REFERENCES products (id)
  ); 

  -- me habia olvidado el logo 

  alter table suppliers add url_logo varchar(255) NULL