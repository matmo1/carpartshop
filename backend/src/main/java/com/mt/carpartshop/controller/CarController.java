package com.mt.carpartshop.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mt.carpartshop.model.Car;
import com.mt.carpartshop.model.Part;
import com.mt.carpartshop.service.CarService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping("/addCar")
    public ResponseEntity<Car> saveCar(@RequestBody Car car) {
        return ResponseEntity.ok(carService.saveCar(car));
    }

    @GetMapping("/allCars")
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    @GetMapping("/carById/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return ResponseEntity.ok(carService.getCarById(id));
    }

    @DeleteMapping("/deleteCar/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{carId}/parts")
    public ResponseEntity<Set<Part>> getPartsForCar(@PathVariable Long carId) {
        return ResponseEntity.ok(carService.getPartsForCar(carId));
    }

    @PostMapping("/{carId}/parts/{partId}")
    public ResponseEntity<Void> addPartToCar(
            @PathVariable Long carId,
            @PathVariable Long partId) {
        carService.addPartToCar(carId, partId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{carId}/parts")
    public ResponseEntity<Void> removePartsFromCar(
            @PathVariable Long carId,
            @RequestBody List<Long> partIds) {
        carService.removePartsFromCar(carId, partIds);
        return ResponseEntity.noContent().build();
    }
}