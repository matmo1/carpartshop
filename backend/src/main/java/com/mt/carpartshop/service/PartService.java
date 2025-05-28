// PartService.java
package com.mt.carpartshop.service;

import com.mt.carpartshop.model.Car;
import com.mt.carpartshop.model.Part;
import com.mt.carpartshop.repository.CarRepository;
import com.mt.carpartshop.repository.PartRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class PartService {
    private final PartRepository partRepository;
    private final CarRepository carRepository;

    public PartService(PartRepository partRepository, CarRepository carRepository) {
        this.partRepository = partRepository;
        this.carRepository = carRepository;
    }

    public Part savePart(Part part) {
        return partRepository.save(part);
    }

    public List<Part> getAllParts() {
        return partRepository.findAll();
    }

    public Part getPartById(Long id) {
        return partRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Part not found with id: " + id));
    }

    public Part findPartByCode(String code) {
        return partRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Part not found with code: " + code));
    }

    public void deletePart(Long id) {
        Part part = partRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Part not found with id: " + id));
        
        // First remove this part from all cars that reference it
        for (Car car : new ArrayList<>(part.getCars())) { // Create a copy to avoid ConcurrentModificationException
            car.getParts().remove(part); // Remove the part from the car
            carRepository.save(car); // Update the car
        }
        
        // Clear the part's cars collection
        part.getCars().clear();
        
        // Now delete the part
        partRepository.delete(part);
    }

    @Transactional(readOnly = true)
    public Set<Car> getCarsForPart(Long partId) {
        return partRepository.findCarsByPartId(partId);
    }

    public void addCarToPart(Long partId, Long carId) {
        Part part = partRepository.findById(partId)
            .orElseThrow(() -> new EntityNotFoundException("Part not found"));
        Car car = carRepository.findById(carId)
            .orElseThrow(() -> new EntityNotFoundException("Car not found"));
        
        part.getCars().add(car);
        partRepository.save(part);
    }
}