import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  isAdminAuthenticated, 
  isEmployeeAuthenticated,
  getCurrentAdmin,
  getCurrentEmployee,
  adminLogout,
  employeeLogout
} from '../../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAdminAuth: false,
    isEmployeeAuth: false,
    admin: null,
    employee: null,
    loading: true
  });

  useEffect(() => {
    // Check authentication on mount
    const isAdminAuth = isAdminAuthenticated();
    const isEmployeeAuth = isEmployeeAuthenticated();
    
    setAuthState({
      isAdminAuth,
      isEmployeeAuth,
      admin: isAdminAuth ? getCurrentAdmin() : null,
      employee: isEmployeeAuth ? getCurrentEmployee() : null,
      loading: false
    });
  }, []);

  const refreshAuth = () => {
    const isAdminAuth = isAdminAuthenticated();
    const isEmployeeAuth = isEmployeeAuthenticated();
    
    setAuthState({
      isAdminAuth,
      isEmployeeAuth,
      admin: isAdminAuth ? getCurrentAdmin() : null,
      employee: isEmployeeAuth ? getCurrentEmployee() : null,
      loading: false
    });
  };

  const logout = () => {
    adminLogout();
    employeeLogout();
    setAuthState({
      isAdminAuth: false,
      isEmployeeAuth: false,
      admin: null,
      employee: null,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};