package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.Integrador.models.Product;



public interface ProductRepository extends JpaRepository<Product, Integer> {

}
