import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LandingPage } from './components/LandingPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminSignup } from './components/AdminSignup';
import { EmployeeLogin } from './components/EmployeeLogin';
import { EmployeeSignup } from './components/EmployeeSignup';
import { AdminDashboard } from './components/AdminDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';

function AppContent() {
  const { isAdminAuth, isEmployeeAuth, loading } = useAuth();
  const [view, setView] = useState('landing'); // landing, admin, employee
  const [authView, setAuthView] = useState('login'); // login, signup

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse mx-auto mb-4 flex items-center justify-center text-3xl">
            💚
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If admin is authenticated, show admin dashboard
  if (isAdminAuth) {
    return <AdminDashboard />;
  }

  // If employee is authenticated, show employee dashboard
  if (isEmployeeAuth) {
    return <EmployeeDashboard />;
  }

  // Handle admin auth views
  if (view === 'admin') {
    if (authView === 'login') {
      return (
        <AdminLogin 
          onSwitchToSignup={() => setAuthView('signup')}
        />
      );
    } else {
      return (
        <AdminSignup 
          onSwitchToLogin={() => setAuthView('login')}
          onSignupSuccess={() => {
            setAuthView('login');
          }}
        />
      );
    }
  }

  // Handle employee auth views
  if (view === 'employee') {
    if (authView === 'login') {
      return (
        <EmployeeLogin 
          onSwitchToSignup={() => setAuthView('signup')}
        />
      );
    } else {
      return (
        <EmployeeSignup 
          onSwitchToLogin={() => setAuthView('login')}
          onSignupSuccess={() => {
            setAuthView('login');
          }}
        />
      );
    }
  }

  // Landing page
  return (
    <LandingPage 
      onNavigate={(type) => {
        setView(type);
        setAuthView('login');
      }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}