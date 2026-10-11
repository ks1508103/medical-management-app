package com.medical.management.repository;

import com.medical.management.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRepository extends JpaRepository<MedicalRecord, Long> {
    // JpaRepository automatically gives us methods like findAll(), save(), findById(), and deleteById()
}