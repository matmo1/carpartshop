package com.mt.carpartshop.model;

import java.util.List;



import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Part {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String name;
    
    @Enumerated(EnumType.STRING) // If using enum
    private PartCategory category;
    
    private double purchasePrice;
    private double sellingPrice;
    
    @ManyToMany
    @JoinTable(
        name = "part_compatible_cars",
        joinColumns = @JoinColumn(name = "part_id"),
        inverseJoinColumns = @JoinColumn(name = "car_id")
    )
    private List<Car> compatibleCars;
    
    @ManyToOne
    private Manufacturer manufacturer;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public PartCategory getCategory() { return category; }
    public void setCategory(PartCategory category) { this.category = category; }
    public double getPurchasePrice() { return purchasePrice; }
    public void setPurchasePrice(double purchasePrice) { this.purchasePrice = purchasePrice; }
    public double getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(double sellingPrice) { this.sellingPrice = sellingPrice; }
    public List<Car> getCompatibleCars() { return compatibleCars; }
    public void setCompatibleCars(List<Car> compatibleCars) { this.compatibleCars = compatibleCars; }
    public Manufacturer getManufacturer() { return manufacturer; }
    public void setManufacturer(Manufacturer manufacturer) { this.manufacturer = manufacturer; }
}