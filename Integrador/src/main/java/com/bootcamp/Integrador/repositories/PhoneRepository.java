package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.Integrador.models.Phone;



public interface PhoneRepository extends JpaRepository<Phone, Integer>{

}
