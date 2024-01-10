--Obtener todos los productos, mostrando nombre del producto, categoría, proveedor (razón social y codigo proveedor), precio.
SELECT p.NAME       AS Producto,
       cat.NAME     AS Categoria,
       s.legal_name AS 'Razon Social',
       s.cod_prov   AS 'Codigo de proveedor',
       p.price      AS Precio
FROM   products p,
       product_categories cat,
       suppliers s
WHERE  p.category_id = cat.id
       AND p.supplier_id = s.id 



--En el listado anterior, además de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Sino tiene imagen, mostrar "-".
SELECT p.NAME                   AS Producto,
       cat.NAME                 AS Categoria,
       s.legal_name             AS 'Razon Social',
       s.cod_prov               AS 'Codigo de proveedor',
       p.price                  AS Precio,
       COALESCE(P.img_url, '-') AS 'URL de la imagen'
FROM   products p,
       product_categories cat,
       suppliers s
WHERE  p.category_id = cat.id
       AND p.supplier_id = s.id 

--Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.
SELECT p.sku         AS SKU,
       cat.NAME      AS Categoria,
       p.NAME        AS 'Nombre del producto',
       p.description AS Descripcion,
       p.price       AS Precio,
       p.img_url     AS 'URL de la imagen'
FROM   products p,
       product_categories cat
WHERE  p.category_id = cat.id 

--Listar todo los proveedores cuyo teléfono tenga la característica de Córdoba o que la provincia sea igual a alguna de las 3 con más proveedores.
SELECT s.cod_prov   AS 'Codigo del proveedor',
       s.legal_name AS 'Razon Social',
       s.web_site   AS 'Sitio web',
       s.phone      AS 'Telefono',
       s.email      AS 'Email',
       s.cuit       AS CUIT
FROM   suppliers s
WHERE  s.phone LIKE ( '+54 351%' ) 

--Traer un listado de todos los proveedores que no hayan sido eliminados , y ordenados por razon social, codigo proveedor y fecha en que se dió de alta ASC. De este listado mostrar los datos que correspondan con su tabla del front.
SELECT s.cod_prov     AS 'Codigo del proveedor',
       s.legal_name   AS 'Razon Social',
       s.web_site     AS 'Sitio web',
       s.phone        AS 'Telefono',
       s.email        AS 'Email',
       con.first_name AS 'Nombre del contacto',
       con.last_name  AS 'Apellido del contacto'
FROM   suppliers s,
       contact_info con
WHERE  s.contact_info_id = con.id
       AND s.is_deleted = 0
ORDER  BY s.legal_name ASC,
          s.cod_prov ASC,
          s.created_at ASC 
--Obtener razon social, codigo proveedor, imagen, web, email, teléfono y los datos del contacto del proveedor con más ordenes de compra cargadas.
SELECT s.legal_name     AS 'Razon Social',
       s.cod_prov       AS 'Codigo del proveedor',
       s.url_logo       AS 'Logo',
       s.web_site       AS 'Sitio web',
       s.phone          AS 'Telefono',
       s.email          AS 'Email',
       con.first_name   AS 'Nombre del contacto',
       con.last_name    AS 'Apellido del contacto',
       con.phone        AS 'Telefono de contacto',
       con.email        AS 'Mail de contacto',
       con.contact_role AS 'Rol de contacto'
FROM   suppliers s,
       contact_info con
WHERE  s.contact_info_id = con.id
       AND s.id = (SELECT TOP 1 sup.id
                   FROM   suppliers sup
                          JOIN purchase_orders PO
                            ON sup.id = PO.supplier_id
                   GROUP  BY sup.id
                   ORDER  BY Count(PO.id) DESC) 


--Mostrar la fecha emisión, nº de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.
SELECT po.emission_date AS 'Fecha de emision',
       po.order_number  AS 'Numero de orden',
       s.legal_name     AS 'Proveedor',
       s.cod_prov       AS 'Codigo del proveedor',
       Sum(pd.quantity) AS 'Cantidad de productos'
FROM   purchase_orders po
       JOIN suppliers s
         ON po.supplier_id = s.id
       JOIN purchase_detail pd
         ON po.id = pd.purchase_order_id
GROUP  BY po.emission_date,
          po.order_number,
          s.legal_name,
          s.cod_prov
ORDER  BY po.emission_date DESC,
          po.order_number; 



--En el listado anterior, diferenciar cuando una orden está Cancelada o no, y el total de la misma.
SELECT po.emission_date                 AS 'Fecha de emision',
       po.order_number                  AS 'Numero de orden',
       s.legal_name                     AS 'Proveedor',
       s.cod_prov                       AS 'Codigo del proveedor',
       Sum(pd.quantity)                 AS 'Cantidad de productos',
       st.status                        AS 'Estado de la orden',
       Sum(pd.quantity * pd.unit_price) AS 'Precio total'
FROM   purchase_orders po
       JOIN suppliers s
         ON po.supplier_id = s.id
       JOIN purchase_detail pd
         ON po.id = pd.purchase_order_id
       JOIN status st
         ON po.status_id = st.id
GROUP  BY po.emission_date,
          po.order_number,
          s.legal_name,
          s.cod_prov,
          st.status
ORDER  BY po.emission_date DESC,
          po.order_number; 

--Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.
SELECT P.sku                       AS 'SKU del producto',
       P.NAME                      AS 'Nombre del producto',
       PD.quantity                 AS 'Cantidad',
       PD.unit_price * PD.quantity AS 'Subtotal'
FROM   purchase_orders PO
       JOIN purchase_detail PD
         ON PO.id = PD.purchase_order_id
       JOIN products P
         ON PD.product_id = P.id
WHERE  PO.supplier_id = 3; 
--Cambiar el estado a Cancelada y la fecha de modificación a la orden de compra con ID = 1.
UPDATE purchase_orders
SET    status_id = (SELECT id
                    FROM   status
                    WHERE  status = 'Cancelada'),
       updated_at = Getdate()
WHERE  id = 1; 

--Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, SÓLO MOSTRAR SENTENCIA)
/*
DELETE FROM PRODUCTS
WHERE id = 1;
*/