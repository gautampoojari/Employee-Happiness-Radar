// Authentication Service - API calls for auth
import api from './api';

// Employee Signup
export const employeeSignup = async (name, email, password, department) => {
  try {
    const response = await api.post('/auth/employee/signup', {
      name,
      email,
      password,
      department,
    });
    return { success: true, ...response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Signup failed',
    };
  }
};

// Employee Login
export const employeeLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/employee/login', {
      email,
      password,
    });
    
    const { token, user } = response.data;
    
    // Store token and user info
    localStorage.setItem('hr_employee_token', token);
    localStorage.setItem('hr_employee', JSON.stringify(user));
    
    return { success: true, token, employee: user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
};

// Admin Signup
export const adminSignup = async (name, email, password, inviteToken) => {
  try {
    const response = await api.post('/auth/admin/signup', {
      name,
      email,
      password,
      inviteToken,
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Signup failed',
    };
  }
};

// Admin Login
export const adminLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/admin/login', {
      email,
      password,
    });
    
    const { token, user } = response.data;
    
    // Store token and user info
    localStorage.setItem('hr_admin_token', token);
    localStorage.setItem('hr_admin', JSON.stringify(user));
    
    return { success: true, token, admin: user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
};

// Validate Invite Token
export const validateInviteToken = async (token) => {
  try {
    const response = await api.post('/auth/validate-token', { token });
    return { valid: true, message: response.data.message };
  } catch (error) {
    return {
      valid: false,
      message: error.response?.data?.message || 'Invalid token',
    };
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return { success: true, user: response.data.user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to get user',
    };
  }
};

// Logout functions
export const adminLogout = () => {
  localStorage.removeItem('hr_admin_token');
  localStorage.removeItem('hr_admin');
};

export const employeeLogout = () => {
  localStorage.removeItem('hr_employee_token');
  localStorage.removeItem('hr_employee');
};

// Check authentication status
export const isAdminAuthenticated = () => {
  const token = localStorage.getItem('hr_admin_token');
  const admin = localStorage.getItem('hr_admin');
  return !!(token && admin);
};

export const isEmployeeAuthenticated = () => {
  const token = localStorage.getItem('hr_employee_token');
  const employee = localStorage.getItem('hr_employee');
  return !!(token && employee);
};

// Get current admin/employee from localStorage
export const getCurrentAdmin = () => {
  const admin = localStorage.getItem('hr_admin');
  return admin ? JSON.parse(admin) : null;
};

export const getCurrentEmployee = () => {
  const employee = localStorage.getItem('hr_employee');
  return employee ? JSON.parse(employee) : null;
};
