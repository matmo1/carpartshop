package com.mt.carpartshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mt.carpartshop.model.Part;

public interface PartRepository extends JpaRepository<Part, Long> {
    Part findByCode(String code);
}
