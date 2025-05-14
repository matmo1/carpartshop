package com.mt.carpartshop.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mt.carpartshop.model.Part;
import com.mt.carpartshop.service.PartService;

import java.util.List;

@RestController
@RequestMapping("/parts")
public class PartController {
    @Autowired
    private PartService partService;

    @PostMapping("/addPart")
    public Part savePart(@RequestBody Part part) {
        return partService.savePart(part);
    }

    @GetMapping("/allParts")
    public List<Part> getAllParts() {
        return partService.getAllParts();
    }

    @GetMapping("/partById/{id}")
    public Part getPartById(@PathVariable Long id) {
        return partService.getPartById(id);
    }

    @GetMapping("/code/{code}")
    public Part findPartByCode(@PathVariable String code) {
        return partService.findPartByCode(code);
    }

    @DeleteMapping("/deletePart/{id}")
    public void deletePart(@PathVariable Long id) {
        partService.deletePart(id);
    }
}