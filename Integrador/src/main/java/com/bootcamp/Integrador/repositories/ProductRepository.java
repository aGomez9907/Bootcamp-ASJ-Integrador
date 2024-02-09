package com.bootcamp.Integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.Integrador.models.Product;
import com.bootcamp.Integrador.models.PurchaseOrderDetail;



public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	 @Query(value="select prod.* from PRODUCTS as prod where  SUPPLIER_ID = :id and IS_DELETED = 'false'", nativeQuery = true )
	    List<Product> findActiveProductsBySupplierId(@Param("id") Integer id);

}
