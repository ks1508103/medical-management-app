package com.medical.shop.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String dosage;
    private String price;         // Changed to String to hold "₹30.00 / strip"
    private String stockQuantity; // Changed to String to hold "150"
    private LocalDateTime addedDate;

    @PrePersist
    public void prePersist() {
        if (this.addedDate == null) {
            this.addedDate = LocalDateTime.now();
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(String stockQuantity) { this.stockQuantity = stockQuantity; }

    public LocalDateTime getAddedDate() { return addedDate; }
    public void setAddedDate(LocalDateTime addedDate) { this.addedDate = addedDate; }
}