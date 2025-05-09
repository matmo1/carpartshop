package com.mt.carpartshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mt.carpartshop.model.Manufacturer;

public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {

}
