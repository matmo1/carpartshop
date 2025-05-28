// PartRepository.java
package com.mt.carpartshop.repository;

import com.mt.carpartshop.model.Car;
import com.mt.carpartshop.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.Set;

public interface PartRepository extends JpaRepository<Part, Long> {
    Optional<Part> findByCode(String code);
    
    @Query("SELECT p.cars FROM Part p WHERE p.id = :partId")
    Set<Car> findCarsByPartId(@Param("partId") Long partId);
}