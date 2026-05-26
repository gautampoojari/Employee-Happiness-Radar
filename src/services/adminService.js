// Admin Service - API calls for admin operations
import api from './api';

// Dashboard & Analytics
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data; // Return full data object, not just stats
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
  }
};

export const getTrendData = async (days = 7) => {
  try {
    const response = await api.get(`/admin/trends?days=${days}`);
    return response.data.trends || [];
  } catch (error) {
    console.error('Failed to fetch trend data:', error);
    return [];
  }
};

export const getDepartmentStats = async () => {
  try {
    const response = await api.get('/admin/department-stats');
    return response.data.departments || [];
  } catch (error) {
    console.error('Failed to fetch department stats:', error);
    return [];
  }
};

export const getBurnoutAlerts = async () => {
  try {
    const response = await api.get('/admin/burnout-alerts');
    return response.data.alerts || [];
  } catch (error) {
    console.error('Failed to fetch burnout alerts:', error);
    return [];
  }
};

// Employee Management
export const getEmployees = async () => {
  try {
    const response = await api.get('/admin/employees');
    return response.data.employees || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch employees');
  }
};

export const getEmployeeById = async (employeeId) => {
  try {
    const response = await api.get(`/admin/employees/${employeeId}`);
    return response.data; // Return full data object with employee, checkIns, and totalCheckIns
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch employee');
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await api.delete(`/admin/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete employee');
  }
};

// Token Management
export const generateInviteToken = async (description) => {
  try {
    const response = await api.post('/admin/tokens/generate', {
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to generate token');
  }
};

export const getAdminTokens = async () => {
  try {
    const response = await api.get('/admin/tokens');
    return response.data.tokens || [];
  } catch (error) {
    console.error('Failed to fetch tokens:', error);
    return [];
  }
};

// Survey Management
export const getAdminSurveys = async () => {
  try {
    const response = await api.get('/admin/surveys');
    return response.data.surveys || [];
  } catch (error) {
    console.error('Failed to fetch surveys:', error);
    return [];
  }
};

export const createSurvey = async (surveyData) => {
  try {
    const response = await api.post('/admin/surveys', surveyData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create survey');
  }
};

export const toggleSurveyStatus = async (surveyId) => {
  try {
    const response = await api.patch(`/admin/surveys/${surveyId}/toggle`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle survey');
  }
};

export const deleteSurvey = async (surveyId) => {
  try {
    const response = await api.delete(`/admin/surveys/${surveyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete survey');
  }
};

export const getSurveyResponses = async (surveyId) => {
  try {
    const response = await api.get(`/admin/surveys/${surveyId}/responses`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch survey responses');
  }
};

// Feedback Management
export const getAllFeedback = async (status = null) => {
  try {
    const url = status ? `/admin/feedback?status=${status}` : '/admin/feedback';
    const response = await api.get(url);
    return response.data.feedbacks || [];
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    return [];
  }
};

export const updateFeedback = async (feedbackId, updates) => {
  try {
    const response = await api.patch(`/admin/feedback/${feedbackId}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update feedback');
  }
};