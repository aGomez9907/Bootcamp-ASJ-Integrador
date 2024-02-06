package com.bootcamp.Integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.Integrador.models.PurchaseOrderDetail;

public interface PurchaseOrderDetailRepository extends JpaRepository<PurchaseOrderDetail, Integer>{

	 @Query(value="select pod.* from PURCHASE_ORDER_DETAILS as pod where PURCHASE_ORDER_ID = :id", nativeQuery = true )
	    List<PurchaseOrderDetail> findDetailByOrderId(@Param("id") Integer id);
}
