package com.bootcamp.Integrador.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.Integrador.models.Address;

public interface AddressRepository extends JpaRepository<Address, Integer>{

}
