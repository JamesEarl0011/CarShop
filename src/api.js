import axios from "axios";

// Base URL for the MockAPI
const BASE_URL = "https://67f6aeb442d6c71cca62f226.mockapi.io";

// Function to fetch cars data
export const fetchCars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cars`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars data:", error);
    throw error;
  }
};
