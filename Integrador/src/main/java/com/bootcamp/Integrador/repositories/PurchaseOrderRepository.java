package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bootcamp.Integrador.models.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Integer>{

}
