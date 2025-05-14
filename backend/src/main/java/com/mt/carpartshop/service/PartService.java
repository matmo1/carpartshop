package com.mt.carpartshop.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mt.carpartshop.model.Part;
import com.mt.carpartshop.repository.PartRepository;

@Service
public class PartService {
    @Autowired
    private PartRepository partRepository;

    public Part savePart(Part part) {
        return partRepository.save(part);
    }

    public List<Part> getAllParts() {
        return partRepository.findAll();
    }

    public Part getPartById(Long id) {
        return partRepository.findById(id).orElse(null);
    }

    public Part findPartByCode(String code) {
        return partRepository.findByCode(code);
    }

    public void deletePart(Long id) {
        partRepository.deleteById(id);
    }
}