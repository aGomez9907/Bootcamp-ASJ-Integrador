package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bootcamp.Integrador.models.Country;

public interface CountryRepository extends JpaRepository<Country, Integer>{

}
