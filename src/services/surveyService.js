// Survey Service - API calls for surveys
import api from './api';

// Get Active Surveys (Employee)
export const getSurveys = async (activeOnly = true) => {
  try {
    if (activeOnly) {
      const response = await api.get('/survey/active');
      return response.data.surveys || [];
    } else {
      // Admin endpoint for all surveys
      const response = await api.get('/admin/surveys');
      return response.data.surveys || [];
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch surveys');
  }
};

// Get Survey by ID
export const getSurveyById = async (surveyId) => {
  try {
    const response = await api.get(`/survey/${surveyId}`);
    return response.data.survey;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch survey');
  }
};

// Submit Survey Response (Employee)
export const submitSurveyResponse = async (surveyId, responses) => {
  try {
    const response = await api.post(`/survey/${surveyId}/respond`, {
      answers: responses, // Backend expects 'answers' not 'responses'
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit response');
  }
};

// Get My Survey Responses (Employee)
export const getMySurveyResponses = async () => {
  try {
    const response = await api.get('/survey/my/responses');
    return response.data.responses || [];
  } catch (error) {
    console.error('Failed to fetch survey responses:', error);
    return [];
  }
};

// Admin: Create Survey
export const createSurvey = async (title, questions, isActive = true) => {
  try {
    const response = await api.post('/admin/surveys', {
      title,
      questions,
      isActive,
    });
    return response.data.survey;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create survey');
  }
};

// Admin: Toggle Survey Status
export const toggleSurveyStatus = async (surveyId) => {
  try {
    const response = await api.patch(`/admin/surveys/${surveyId}/toggle`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle survey');
  }
};

// Admin: Delete Survey
export const deleteSurvey = async (surveyId) => {
  try {
    const response = await api.delete(`/admin/surveys/${surveyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete survey');
  }
};

// Admin: Get Survey Responses
export const getSurveyResponses = async (surveyId) => {
  try {
    const response = await api.get(`/admin/surveys/${surveyId}/responses`);
    return response.data.responses || [];
  } catch (error) {
    console.error('Failed to fetch survey responses:', error);
    return [];
  }
};