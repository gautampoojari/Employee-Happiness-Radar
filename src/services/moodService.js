// Mood Check-in Service - API calls for mood tracking
import api from './api';

// Create/Update Mood Check-in
export const addMoodCheckIn = async (data) => {
  try {
    const response = await api.post('/mood/checkin', {
      happiness: data.happiness,
      stress: data.stress,
      motivation: data.motivation,
      hydration: data.hydration,
      note: data.note || '',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit check-in');
  }
};

// Get My Check-ins
export const getMoodCheckIns = async () => {
  try {
    const response = await api.get('/mood/my-checkins');
    return response.data.checkIns || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch check-ins');
  }
};

// Get My Streak
export const getEmployeeStreak = async () => {
  try {
    const response = await api.get('/mood/my-streak');
    return response.data.streak || 0;
  } catch (error) {
    console.error('Failed to fetch streak:', error);
    return 0;
  }
};

// Get Today's Check-in
export const getTodayCheckIn = async () => {
  try {
    const response = await api.get('/mood/today');
    return response.data.checkIn || null;
  } catch (error) {
    return null;
  }
};

// Get Mood Statistics
export const getMoodStats = async () => {
  try {
    const response = await api.get('/mood/stats');
    return response.data.stats || {};
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch stats');
  }
};

// Get Employee Trend Data (for charts)
export const getEmployeeTrendData = async (days = 30) => {
  try {
    const response = await api.get('/mood/my-checkins');
    const checkIns = response.data.checkIns || [];
    
    // Sort and limit to specified days
    return checkIns
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, days)
      .reverse();
  } catch (error) {
    console.error('Failed to fetch trend data:', error);
    return [];
  }
};
