package com.medical.shop.api.controller;

import com.medical.shop.api.dto.MedicineDTO;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*") // Allows your React frontend to connect without CORS errors[cite: 2]
public class InventoryController {

    private final List<MedicineDTO> inventory = new ArrayList<>();

    public InventoryController() {
        inventory.add(new MedicineDTO(1L, "Paracetamol 500mg", "Painkiller", 25.00, 15));
        inventory.add(new MedicineDTO(2L, "Amoxicillin 250mg", "Antibiotic", 120.50, 60));
        inventory.add(new MedicineDTO(3L, "Cetirizine 10mg", "Antihistamine", 45.00, 8));
    }

    @GetMapping("/medicines")
    public List<MedicineDTO> getAllMedicines() {
        return inventory;
    }

    @PostMapping("/add")
    public MedicineDTO addMedicine(@RequestBody MedicineDTO newMed) {
        newMed.setId(System.currentTimeMillis());
        inventory.add(newMed);
        return newMed;
    }
}