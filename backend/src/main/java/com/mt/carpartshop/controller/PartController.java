package com.mt.carpartshop.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mt.carpartshop.model.Car;
import com.mt.carpartshop.model.Part;
import com.mt.carpartshop.service.PartService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/parts")
public class PartController {
    @Autowired
    private PartService partService;

    @PostMapping("/addPart")
    public ResponseEntity<Part> savePart(@RequestBody Part part) {
        return ResponseEntity.ok(partService.savePart(part));
    }

    @GetMapping("/allParts")
    public ResponseEntity<List<Part>> getAllParts() {
        return ResponseEntity.ok(partService.getAllParts());
    }

    @GetMapping("/partById/{id}")
    public ResponseEntity<Part> getPartById(@PathVariable Long id) {
        return ResponseEntity.ok(partService.getPartById(id));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<Part> findPartByCode(@PathVariable String code) {
        return ResponseEntity.ok(partService.findPartByCode(code));
    }

    @DeleteMapping("/deletePart/{id}")
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        partService.deletePart(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{partId}/cars")
    public ResponseEntity<Set<Car>> getCarsForPart(@PathVariable Long partId) {
        return ResponseEntity.ok(partService.getCarsForPart(partId));
    }

    @PostMapping("/{partId}/cars/{carId}")
    public ResponseEntity<Void> addCarToPart(
            @PathVariable Long partId,
            @PathVariable Long carId) {
        partService.addCarToPart(partId, carId);
        return ResponseEntity.ok().build();
    }
}