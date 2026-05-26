// Feedback Service - API calls for feedback
import api from './api';

// Submit Feedback (Employee)
export const submitFeedback = async (feedback, isAnonymous = false) => {
  try {
    const response = await api.post('/feedback', {
      feedback,
      isAnonymous,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit feedback');
  }
};

// Get My Feedback (Employee)
export const getMyFeedback = async () => {
  try {
    const response = await api.get('/feedback/my-feedback');
    return response.data.feedback || [];
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    return [];
  }
};

// Admin: Get All Feedback
export const getAllFeedback = async () => {
  try {
    const response = await api.get('/admin/feedback');
    return response.data.feedback || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
  }
};

// Admin: Update Feedback Status
export const updateFeedbackStatus = async (feedbackId, status) => {
  try {
    const response = await api.patch(`/admin/feedback/${feedbackId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update feedback');
  }
};
