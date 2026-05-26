// API Configuration and Axios Instance
import axios from 'axios';

// API Base URL - defaults to localhost:5000
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const adminToken = localStorage.getItem('hr_admin_token');
    const employeeToken = localStorage.getItem('hr_employee_token');
    
    const token = adminToken || employeeToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - clear tokens and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('hr_admin_token');
      localStorage.removeItem('hr_admin');
      localStorage.removeItem('hr_employee_token');
      localStorage.removeItem('hr_employee');
      
      // Optionally redirect to login page
      // window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

export default api;
