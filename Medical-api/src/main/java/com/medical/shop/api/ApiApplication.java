package com.medical.shop.api;

import com.medical.shop.api.model.Medicine;
import com.medical.shop.api.repository.MedicineRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @Bean
    public CommandLineRunner demoData(MedicineRepository repository) {
        return (args) -> {
            System.out.println("\n========================================");
            System.out.println("   JPA REPOSITORY CRUD OPERATIONS OUTPUT");
            System.out.println("========================================");

            // 1. CREATE / INSERT
            Medicine med = new Medicine();
            med.setMedicineName("Paracetamol");
            med.setCategory("Analgesic");
            med.setPrice(25.0);
            med.setQuantity(100);
            med.setInStock(true);
            repository.save(med);
            System.out.println("1. Create / Insert - record added (Paracetamol, price 25)");

            // 2. READ
            Medicine fetched = repository.findById(med.getId()).orElse(null);
            System.out.println("2. Read - record fetched: " + fetched);

            // 3. UPDATE
            if (fetched != null) {
                fetched.setPrice(30.0);
                repository.save(fetched);
                System.out.println("3. Update - price changed from 25 to 30");
            }

            // 4. DELETE
            if (fetched != null) {
                repository.delete(fetched);
                System.out.println("4. Delete - record removed (table empty)");
            }
            System.out.println("========================================\n");
        };
    }
}