package com.medical.shop.api.controller;

import com.medical.shop.api.model.MedicalRecord;
import com.medical.shop.api.repository.MedicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "http://localhost:3000") // Connects your React frontend
public class MedicalController {

    @Autowired
    private MedicalRepository medicalRepository;

    // CREATE (POST) - Add a new medical transaction/record
    @PostMapping
    public MedicalRecord createRecord(@RequestBody MedicalRecord record) {
        return medicalRepository.save(record);
    }

    // READ ALL (GET) - Fetch all medical records
    @GetMapping
    public List<MedicalRecord> getAllRecords() {
        return medicalRepository.findAll();
    }

    // READ BY ID (GET) - Fetch a single medical record by ID
    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getRecordById(@PathVariable Long id) {
        MedicalRecord record = medicalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found with id: " + id));
        return ResponseEntity.ok(record);
    }

    // UPDATE (PUT) - Edit an existing record (matches your assignment edit form)
    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateRecord(@PathVariable Long id, @RequestBody MedicalRecord recordDetails) {
        MedicalRecord record = medicalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found with id: " + id));

        record.setTitle(recordDetails.getTitle());
        record.setAmount(recordDetails.getAmount());
        record.setCategory(recordDetails.getCategory());
        record.setDate(recordDetails.getDate());
        record.setType(recordDetails.getType());

        MedicalRecord updatedRecord = medicalRepository.save(record);
        return ResponseEntity.ok(updatedRecord);
    }

    // DELETE (DELETE) - Remove a record and return a status response
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRecord(@PathVariable Long id) {
        medicalRepository.deleteById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Medical record deleted successfully");
        response.put("data", null);

        return ResponseEntity.ok(response);
    }
}