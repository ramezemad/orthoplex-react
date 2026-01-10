import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Mock login API - In a real app, this would be your actual backend endpoint
export const loginUser = async (username, password) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Mock validation - accept any non-empty username/password
  // In production, this would be a real API call
  if (username && password) {
    return {
      data: {
        success: true,
        user: { username, id: Date.now() },
        token: "mock-jwt-token",
      },
    };
  }
  throw new Error("Invalid credentials");
};

export const fetchData = () =>
  axios.get(`${API_BASE_URL}/posts?_limit=5`);
