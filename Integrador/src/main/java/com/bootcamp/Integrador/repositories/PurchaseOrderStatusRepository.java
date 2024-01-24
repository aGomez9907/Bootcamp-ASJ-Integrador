package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bootcamp.Integrador.models.PurchaseOrderStatus;

public interface PurchaseOrderStatusRepository extends JpaRepository<PurchaseOrderStatus, Integer>{

}
