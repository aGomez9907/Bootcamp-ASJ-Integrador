package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bootcamp.Integrador.models.SupplierCategory;

public interface SupplierCategoryRepository extends JpaRepository<SupplierCategory, Integer> {

}
