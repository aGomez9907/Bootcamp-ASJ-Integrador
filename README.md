# Proyect Integrador Final

Desarrollo de un _Sistema de Gestión Compras_ para manejar información de Proveedores, Productos y Órdenes de compra.

## Ejecutar localmente

Pasos necesarios para correr el proyecto localmente

- Crear una base de datos llamada

```sql
  CREATE DATABASE integradorNUEVA;
```

- Insertar **Paises**

```sql
INSERT INTO countries (name) VALUES ('Argentina');
INSERT INTO countries (name) VALUES ('Estados Unidos');
INSERT INTO countries (name) VALUES ('Francia');
```

- Insertar **Provincias**

```sql
-- Insertar provincias para el país con ID 1
INSERT INTO provinces (country_id, name) VALUES (1, 'Buenos Aires');
INSERT INTO provinces (country_id, name) VALUES (1, 'Córdoba');
INSERT INTO provinces (country_id, name) VALUES (1, 'Santa Fe');

```

- Insertar **Estatus de orden de compra**

```sql
-- Inserting purchase order details statuses
INSERT INTO purchase_order_statuses (status) VALUES ('Canceled');
INSERT INTO  purchase_order_statuses (status) VALUES ('Paid');
INSERT INTO  purchase_order_statuses (status) VALUES ('Outstanding');
```

- Insertar \*_Condiciones fiscales_

```sql
-- Inserting tax conditions for Argentina
INSERT INTO tax_conditions (condition) VALUES ('Responsable Inscripto');
INSERT INTO tax_conditions (condition) VALUES ('Monotributista');
INSERT INTO tax_conditions (condition) VALUES ('Exento');
```

- Ejecutar el servidor de Angular (_puerto 4200_)

```bash
**llegar hasta /integrador-angular*
  ng s -o
```

- Ejecutar el servidor de Java (_puerto 8080_)(luego de hacer el mvn install)

- Insertar algunas **Categorías** desde el FRONT

- Insertar algunas **Rubros** desde el FRONT

- Insertar algunas **Proveedores** desde el FRONT

- Insertar algunas **Productos** desde el FRONT

- Insertar algunas **Ordenes de Compra** desde el FRONT

#### Obtener todos los productos

```http
  GET http://localhost:8080/products
```

#### Obtener un producto

```http
  GET http://localhost:8080/products/${id}
```

| Parámetro | Tipo      | Descripción                               |
| :-------- | :-------- | :---------------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Producto a buscar |

#### Obtener todos los proveedores

```http
  GET http://localhost:8080/suppliers
```

#### Obtener un proveedores

```http
  GET http://localhost:8080/suppliers/${id}
```

| Parámetro | Tipo      | Descripción                               |
| :-------- | :-------- | :---------------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Producto a buscar |

### El resto de entidades tienen un funcionamiento identico

## Desarrollado por _Alejo Gomez_
