// CarRepository.java
package com.mt.carpartshop.repository;

import com.mt.carpartshop.model.Car;
import com.mt.carpartshop.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Set;

public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c.parts FROM Car c WHERE c.id = :carId")
    Set<Part> findPartsByCarId(@Param("carId") Long carId);
}