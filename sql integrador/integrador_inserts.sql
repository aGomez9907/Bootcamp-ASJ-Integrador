
INSERT INTO STATUS (status, created_at, updated_at) VALUES
('Activo', GETDATE(), NULL),
('Cancelada', GETDATE(), NULL),
('Pendiente de pago', GETDATE(), NULL);


INSERT INTO COUNTRIES (name) VALUES
('Argentina'),
('Chile'),
('Brasil'),
('México'),
('España');


INSERT INTO PROVINCES (country_id, name) VALUES
(1, 'Buenos Aires'),
(1, 'Córdoba'),
(1, 'Santa Fe'),
(1, 'La pampa'),
(2, 'Santiago'),
(3, 'São Paulo'),
(4, 'Ciudad de México');


INSERT INTO CITIES (province_id, name) VALUES
(1, 'La Plata'),
(1, 'Lomas de Zamora'),
(1, 'Lanus'),
(1, 'Avellaneda'),
(2, 'Córdoba Capital'),
(3, 'Rosario'),
(3, 'Santa Fe'),
(4, 'Santa Rosa'),
(5, 'Santiago Centro'),
(6, 'São Paulo Centro'),
(7, 'Polanco');


INSERT INTO ADDRESSES (city_id, street, number, postcode, created_at, updated_at) VALUES
(1, '25', 123, 'B1900', GETDATE(), NULL),
(1, '30', 987, 'B1900', GETDATE(), NULL),
(2, 'Loria', 456, 'B1832', GETDATE(), NULL),
(2, 'Italia', 33, 'B1832', GETDATE(), NULL),
(3, 'Riobamba', 125, 'B1824', GETDATE(), NULL),
(4, 'French', 51, 'B1870', GETDATE(), NULL),
(5, 'Av. Maipu', 475, 'X5000', GETDATE(), NULL),
(6, 'Montevideo', 3740, 'S2002', GETDATE(), NULL),
(7, 'Pedro de Vega', 2117, 'S3000', GETDATE(), NULL),
(8, '1 de Mayo', 834, 'L6302', GETDATE(), NULL);

-- Insertar datos en la tabla CONTACT_INFO
INSERT INTO CONTACT_INFO (first_name, last_name, phone, email, contact_role, created_at, updated_at) VALUES
('Juan', 'Pérez', '1234567890', 'juan@gmail.com', 'Gerente de ventas', GETDATE(), NULL),
('María', 'Gómez', '987654321', 'maria@gmail.com', 'Gerente comercial', GETDATE(), NULL),
('Carlos', 'Rodríguez', '555123456', 'carlos@hotmail.com', 'Vendedor', GETDATE(), NULL),
('Ana', 'López', '777987654', 'ana@yahoo.com', 'Vendedor', GETDATE(), NULL),
('Pablo', 'Martínez', '888456789', 'pablo@live.com', 'Gerente comercial', GETDATE(), NULL),
('Alejandro', 'González', '555111222', 'alejandro@gmail.com', 'Gerente de Marketing', GETDATE(), NULL),
('Laura', 'Fernández', '333444555', 'laura@hotmail.com', 'Analista de Ventas', GETDATE(), NULL),
('Gabriel', 'Hernández', '777888999', 'gabriel@yahoo.com', 'Asistente Comercial', GETDATE(), NULL),
('Sofía', 'Torres', '111222333', 'sofia@gmail.com', 'Representante de Ventas', GETDATE(), NULL),
('Martín', 'López', '999888777', 'martin@live.com', 'Especialista en Clientes', GETDATE(), NULL);




INSERT INTO TAX_CONDITIONS (name) VALUES
('IVA Responsable Inscripto'),
('IVA Responsable no Inscripto'),
('IVA no Responsable'),
('IVA Sujeto Exento'),
('Consumidor Final'),
('Responsable Monotributo'),
('Sujeto no Categorizado'),
('Proveedor del Exterior'),
('Cliente del Exterior'),
('IVA Liberado – Ley Nº 19.640'),
('IVA Responsable Inscripto – Agente de Percepcion'),
('Pequeño Contribuyente Eventual'),
('Monotributista Social'),
('Pequeño Contribuyente Eventual Social');



INSERT INTO SUPPLIER_CATEGORIES (name, created_at, updated_at) VALUES
('Electrónica', GETDATE(), NULL),
('Alimentación', GETDATE(), NULL),
('Textil', GETDATE(), NULL),
('Herramientas', GETDATE(), NULL),
('Muebles', GETDATE(), NULL),
('Juguetes', GETDATE(), NULL),
('Papelería', GETDATE(), NULL),
('Deportes', GETDATE(), NULL),
('Cosméticos', GETDATE(), NULL),
('Electrodomésticos', GETDATE(), NULL),
('Mascotas', GETDATE(), NULL),
('Automotriz', GETDATE(), NULL),
('Instrumentos Musicales', GETDATE(), NULL),
('Ropa Deportiva', GETDATE(), NULL),
('Electrónica de Consumo', GETDATE(), NULL);


INSERT INTO PRODUCT_CATEGORIES (name, created_at, updated_at) VALUES
('Electrodomésticos', GETDATE(), NULL),
('Alimentos', GETDATE(), NULL),
('Ropa', GETDATE(), NULL),
('Herramientas', GETDATE(), NULL),
('Muebles', GETDATE(), NULL),
('Electrónica', GETDATE(), NULL),
('Libros', GETDATE(), NULL),
('Jardinería', GETDATE(), NULL),
('Joyería', GETDATE(), NULL),
('Deportes', GETDATE(), NULL),
('Arte y Manualidades', GETDATE(), NULL),
('Juguetes', GETDATE(), NULL),
('Herramientas', GETDATE(), NULL),
('Cuidado Personal', GETDATE(), NULL),
('Hogar y Cocina', GETDATE(), NULL);



INSERT INTO SUPPLIERS (address_id, category_id, tax_condition_id, contact_info_id, cod_prov, legal_name, web_site, phone, email, cuit, created_at, updated_at) VALUES
(1, 1, 2, 1, 'PROV001', 'Electrónica SRL', 'http://www.electronica.com', '+54 11 3456789', 'info@electronica.com', '30-12345678-1', GETDATE(), NULL),
(2, 2, 3, 2, 'PROV002', 'Alimentos SA', 'http://www.alimentos.com', '+54 11 87654321', 'info@alimentos.com', '30-12348786-1', GETDATE(), NULL),
(3, 3, 1, 3, 'PROV003', 'Textil Importaciones', NULL, '+54 11 555123456', 'info@textil.com', '30-10946386-1', GETDATE(), NULL),
(4, 4, 4, 4, 'PROV004', 'Herramientas del Sur', 'http://www.herramientas.com', '+54 11 777987654', 'info@herramientas.com', '30-04739825-1', GETDATE(), NULL),
(5, 5, 5, 5, 'PROV005', 'Muebles Elegantes', 'http://www.muebles.com', '+54 11 888456789', 'info@muebles.com', '30-63927497-1', GETDATE(), NULL),
(6, 6, 3, 6, 'PROV006', 'Juguetes Lindos', 'http://www.juguetes.com', '+54 11 854356789', 'info@juguetes.com', '30-63934749-1', GETDATE(), NULL),
(7, 7, 2, 7, 'PROV007', 'Papeles Grandes', 'http://www.papel.com', '+54 351 76497345', 'info@papeles.com', '30-61234749-1', GETDATE(), NULL),
(8, 8, 4, 8, 'PROV008', 'Deportes Extremos', 'http://www.deportes.com', '+54 341 76098654', 'info@deportes.com', '30-60192879-1', GETDATE(), NULL),
(9, 9, 1, 9, 'PROV009', 'Cosmeticos Baratos', 'http://www.cosmeticos.com', '+54 342 7609854', 'info@cosmeticos.com', '30-61827790-1', GETDATE(), NULL),
(10, 10, 2, 10, 'PROV010', 'Electrodomesticos Blancos', 'http://www.electro.com', '+54 2338 76156654', 'info@electrodomesticos.com', '30-60147329-1', GETDATE(), NULL);

INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(1, 1, 'SKU001', 'Smart TV', 'Pantalla LED 55"', 799.99, 'http://www.example.com/tv.jpg', GETDATE(), NULL),
(6, 1, 'SKU002', 'Auriculares Inalámbricos', 'Con cancelación de ruido', 129.99, 'http://www.example.com/auriculares.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(2, 2, 'SKU003', 'Arroz', 'Arroz blanco 1kg', 2.49, NULL, GETDATE(), NULL),
(2, 2, 'SKU004', 'Aceite de Oliva', 'Extra virgen, 500ml', 8.99, 'http://www.example.com/aceite.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(3, 3, 'SKU005', 'Camiseta', 'Camiseta de algodón', 19.99, 'http://www.example.com/camiseta.jpg', GETDATE(), NULL),
(3, 3, 'SKU006', 'Jeans', 'Jeans ajustados, talla M', 39.99, 'http://www.example.com/jeans.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(13, 4, 'SKU007', 'Taladro', 'Taladro inalámbrico 18V', 129.99, 'http://www.example.com/taladro.jpg', GETDATE(), NULL),
(13, 4, 'SKU008', 'Sierra Circular', 'Sierra de mano eléctrica', 89.99, 'http://www.example.com/sierra.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(5, 5, 'SKU009', 'Sofá', 'Sofá de cuero', 599.99, 'http://www.example.com/sofa.jpg', GETDATE(), NULL),
(5, 5, 'SKU010', 'Mesa de Centro', 'Mesa de madera maciza', 299.99, 'http://www.example.com/mesa.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(12, 6, 'SKU011', 'Juguetes Educativos', 'Set de construcción', 29.99, 'http://www.example.com/juguetes.jpg', GETDATE(), NULL),
(12, 6, 'SKU012', 'Muñeca', 'Muñeca de tela suave', 14.99, 'http://www.example.com/muneca.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(7, 7, 'SKU013', 'Cuadernos', 'Pack de 3 cuadernos', 8.99, 'http://www.example.com/cuadernos.jpg', GETDATE(), NULL),
(11, 7, 'SKU014', 'Papel de Regalo', 'Pack de 5 rollos', 5.99, 'http://www.example.com/papel.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(10, 8, 'SKU015', 'Balón de Fútbol', 'Tamaño oficial', 19.99, 'http://www.example.com/balon.jpg', GETDATE(), NULL),
(10, 8, 'SKU016', 'Raqueta de Tenis', 'Raqueta profesional', 79.99, 'http://www.example.com/raqueta.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(14, 9, 'SKU017', 'Set de Maquillaje', 'Set completo de maquillaje', 49.99, 'http://www.example.com/maquillaje.jpg', GETDATE(), NULL),
(14, 9, 'SKU018', 'Perfume Floral', 'Fragancia femenina', 29.99, 'http://www.example.com/perfume.jpg', GETDATE(), NULL);


INSERT INTO PRODUCTS (category_id, supplier_id, SKU, name, description, price, img_url, created_at, updated_at) VALUES
(15, 10, 'SKU019', 'Licuadora', 'Licuadora de alta potencia', 89.99, 'http://www.example.com/licuadora.jpg', GETDATE(), NULL),
(15, 10, 'SKU020', 'Aspiradora', 'Aspiradora sin bolsa', 149.99, 'http://www.example.com/aspiradora.jpg', GETDATE(), NULL);









INSERT INTO PURCHASE_ORDERS (supplier_id, status_id, order_number, emission_date, delivery_date, descriprion, created_at, updated_at) VALUES
(1, 1, 1001, '2024-01-10', '2024-01-20', 'Orden de compra #1001', GETDATE(), NULL),
(2, 1, 1002, '2023-01-11', '2023-01-21', 'Orden de compra #1002', '2023-01-11', NULL),
(3, 1, 1003, '2023-02-12', '2023-02-22', 'Orden de compra #1003','2023-01-11', NULL),
(4, 2, 1004, '2023-06-13', '2023-06-23', 'Orden de compra #1004', '2023-01-11', NULL),
(5, 3, 1005, '2023-08-14', '2023-08-24', 'Orden de compra #1005', '2023-01-11', NULL);



INSERT INTO PURCHASE_DETAIL (purchase_order_id, product_id, quantity, unit_price, created_at, updated_at) VALUES
(1, 1, 10, 699.99, '2024-01-10', NULL),
(1, 2, 5, 1.99, '2024-01-10', NULL);


INSERT INTO PURCHASE_DETAIL (purchase_order_id, product_id, quantity, unit_price, created_at, updated_at) VALUES
(2, 3, 15, 15.99, '2023-01-11', NULL),
(2, 4, 3, 119.99,'2023-01-11', NULL);


INSERT INTO PURCHASE_DETAIL (purchase_order_id, product_id, quantity, unit_price, created_at, updated_at) VALUES
(3, 5, 2, 549.99, '2023-02-12', NULL),
(3, 6, 10, 29.99, '2023-02-12', NULL);


INSERT INTO PURCHASE_DETAIL (purchase_order_id, product_id, quantity, unit_price, created_at, updated_at) VALUES
(4, 7, 5, 8.99, '2023-06-13', NULL),
(4, 8, 2, 79.99,'2023-06-13', NULL);


INSERT INTO PURCHASE_DETAIL (purchase_order_id, product_id, quantity, unit_price, created_at, updated_at) VALUES
(5, 9, 3, 49.99, '2023-08-14', NULL),
(5, 10, 1, 89.99, '2023-08-14', NULL);



--agrego una mas al proveedor 1 para la query 6 

INSERT INTO PURCHASE_ORDERS (supplier_id, status_id, order_number, emission_date, delivery_date, descriprion, created_at, updated_at) VALUES
(1, 1, 1007, '2024-01-09', '2024-01-19', 'Orden de compra #1007', GETDATE(), NULL);

INSERT INTO PURCHASE_DETAIL (purchase_order_id, product_id, quantity, unit_price, created_at, updated_at) VALUES
(6, 1, 50, 699.99, '2024-01-09', NULL);

