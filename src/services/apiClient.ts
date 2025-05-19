// src/services/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Create a base axios instance
const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 30000, // 30 second timeout
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  // Request interceptor for authentication
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle unauthorized errors (401)
      if (error.response && error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );
  
  return client;
};

export default createApiClient;
