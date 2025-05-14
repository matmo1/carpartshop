package com.mt.carpartshop.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mt.carpartshop.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {

}