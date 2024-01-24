package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.Integrador.models.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer>{

}
