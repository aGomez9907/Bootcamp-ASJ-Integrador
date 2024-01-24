package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bootcamp.Integrador.models.TaxCondition;

public interface TaxConditionRepository extends JpaRepository<TaxCondition, Integer>{

}
