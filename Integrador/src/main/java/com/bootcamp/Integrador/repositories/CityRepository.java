package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bootcamp.Integrador.models.City;

public interface CityRepository extends JpaRepository<City, Integer>{

}
