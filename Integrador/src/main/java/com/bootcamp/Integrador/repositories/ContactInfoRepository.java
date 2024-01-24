package com.bootcamp.Integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.bootcamp.Integrador.models.ContactInfo;

public interface ContactInfoRepository extends JpaRepository<ContactInfo, Integer> {

}
