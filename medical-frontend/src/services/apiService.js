import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// API service layer for your medical system
const apiService = {
  // Fetch live inventory from Spring Boot backend
  getMedicines: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory/medicines`);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory from backend');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error connecting to Spring Boot backend:", error);
      return [];
    }
  },

  // Add a new medicine via Spring Boot backend POST endpoint
  addMedicine: async (medicineData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  },

  // Simulates sending an SMS alert via a backend API call
  sendStockAlertSMS: async (medicineName, stockCount, ownerPhone) => {
    try {
      // We simulate a network delay using a Promise (like a real server request)
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      console.log(`[API Gateway] SMS sent to ${ownerPhone}: Low stock for ${medicineName} (${stockCount} left).`);
      
      return { success: true, message: `SMS successfully dispatched for ${medicineName}` };
    } catch (error) {
      console.error('API Error sending SMS:', error);
      throw error;
    }
  }
};

export default apiService;