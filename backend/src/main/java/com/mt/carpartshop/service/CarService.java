// CarService.java
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
public class CarService {
    private final CarRepository carRepository;
    private final PartRepository partRepository;

    public CarService(CarRepository carRepository, PartRepository partRepository) {
        this.carRepository = carRepository;
        this.partRepository = partRepository;
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
    }

    public void deleteCar(Long id) {
        Car car = carRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Car not found with id: " + id));
        
        // First remove this car from all parts that reference it
        for (Part part : new ArrayList<>(car.getParts())) { // Create a copy to avoid ConcurrentModificationException
            part.getCars().remove(car); // Remove the car from the part
            partRepository.save(part); // Update the part
        }
        
        // Clear the car's parts collection
        car.getParts().clear();
        
        // Now delete the car
        carRepository.delete(car);
    }

    @Transactional(readOnly = true)
    public Set<Part> getPartsForCar(Long carId) {
        return carRepository.findPartsByCarId(carId);
    }

    public void addPartToCar(Long carId, Long partId) {
        Car car = carRepository.findById(carId)
            .orElseThrow(() -> new EntityNotFoundException("Car not found"));
        Part part = partRepository.findById(partId)
            .orElseThrow(() -> new EntityNotFoundException("Part not found"));
        
        car.getParts().add(part);
        carRepository.save(car);
    }
}