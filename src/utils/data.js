// Data management utilities for Employee Happiness Radar

// Initialize demo data
export const initializeDemoData = () => {
  // Initialize employees if not exists
  if (!localStorage.getItem('hr_employees')) {
    localStorage.setItem('hr_employees', JSON.stringify([]));
  }
  
  // Initialize admins if not exists
  if (!localStorage.getItem('hr_admins')) {
    localStorage.setItem('hr_admins', JSON.stringify([]));
  }
  
  // Initialize mood check-ins
  if (!localStorage.getItem('hr_mood_checkins')) {
    localStorage.setItem('hr_mood_checkins', JSON.stringify([]));
  }
  
  // Initialize surveys
  if (!localStorage.getItem('hr_surveys')) {
    localStorage.setItem('hr_surveys', JSON.stringify([]));
  }
  
  // Initialize survey responses
  if (!localStorage.getItem('hr_survey_responses')) {
    localStorage.setItem('hr_survey_responses', JSON.stringify([]));
  }
  
  // Initialize feedback
  if (!localStorage.getItem('hr_feedback')) {
    localStorage.setItem('hr_feedback', JSON.stringify([]));
  }
};

// Mood Check-in Functions
export const addMoodCheckIn = (employeeId, data) => {
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]');
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  
  const newCheckIn = {
    id: `checkin_${Date.now()}`,
    employeeId,
    ...data,
    timestamp: Date.now(),
    date: new Date().toISOString().split('T')[0]
  };
  
  checkIns.push(newCheckIn);
  localStorage.setItem('hr_mood_checkins', JSON.stringify(checkIns));
  
  // Update employee streak
  updateEmployeeStreak(employeeId);
  
  return newCheckIn;
};

export const getMoodCheckIns = (employeeId = null) => {
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]');
  
  if (employeeId) {
    return checkIns.filter(c => c.employeeId === employeeId);
  }
  
  return checkIns;
};

export const getMoodCheckInsByDepartment = (department) => {
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]');
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  
  const deptEmployeeIds = employees
    .filter(e => e.department === department)
    .map(e => e.id);
  
  return checkIns.filter(c => deptEmployeeIds.includes(c.employeeId));
};

// Streak management
export const updateEmployeeStreak = (employeeId) => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]');
  
  const employeeIndex = employees.findIndex(e => e.id === employeeId);
  if (employeeIndex === -1) return;
  
  const employee = employees[employeeIndex];
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  // Check if already checked in today
  const todayCheckIn = checkIns.find(c => 
    c.employeeId === employeeId && c.date === today
  );
  
  // Count check-ins for today (before this one)
  const todayCheckIns = checkIns.filter(c => 
    c.employeeId === employeeId && c.date === today
  ).length;
  
  // If this is first check-in today
  if (todayCheckIns === 1) {
    const lastCheckInDate = employee.lastCheckIn;
    
    if (!lastCheckInDate) {
      // First ever check-in
      employee.streak = 1;
    } else if (lastCheckInDate === yesterday) {
      // Continuing streak
      employee.streak = (employee.streak || 0) + 1;
    } else if (lastCheckInDate === today) {
      // Already checked in today, don't change streak
    } else {
      // Missed days, reset streak
      employee.streak = 1;
    }
    
    employee.lastCheckIn = today;
  }
  
  employees[employeeIndex] = employee;
  localStorage.setItem('hr_employees', JSON.stringify(employees));
};

export const getEmployeeStreak = (employeeId) => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  const employee = employees.find(e => e.id === employeeId);
  return employee?.streak || 0;
};

// Survey Functions
export const createSurvey = (title, questions, isActive = true) => {
  const surveys = JSON.parse(localStorage.getItem('hr_surveys') || '[]');
  
  const newSurvey = {
    id: `survey_${Date.now()}`,
    title,
    questions, // Array of { question, type: 'rating' | 'text' }
    isActive,
    createdAt: Date.now()
  };
  
  surveys.push(newSurvey);
  localStorage.setItem('hr_surveys', JSON.stringify(surveys));
  
  return newSurvey;
};

export const getSurveys = (activeOnly = false) => {
  const surveys = JSON.parse(localStorage.getItem('hr_surveys') || '[]');
  
  if (activeOnly) {
    return surveys.filter(s => s.isActive);
  }
  
  return surveys;
};

export const toggleSurveyStatus = (surveyId) => {
  const surveys = JSON.parse(localStorage.getItem('hr_surveys') || '[]');
  const index = surveys.findIndex(s => s.id === surveyId);
  
  if (index !== -1) {
    surveys[index].isActive = !surveys[index].isActive;
    localStorage.setItem('hr_surveys', JSON.stringify(surveys));
  }
};

export const deleteSurvey = (surveyId) => {
  const surveys = JSON.parse(localStorage.getItem('hr_surveys') || '[]');
  const filtered = surveys.filter(s => s.id !== surveyId);
  localStorage.setItem('hr_surveys', JSON.stringify(filtered));
  
  // Also delete responses
  const responses = JSON.parse(localStorage.getItem('hr_survey_responses') || '[]');
  const filteredResponses = responses.filter(r => r.surveyId !== surveyId);
  localStorage.setItem('hr_survey_responses', JSON.stringify(filteredResponses));
};

export const submitSurveyResponse = (surveyId, employeeId, responses) => {
  const surveyResponses = JSON.parse(localStorage.getItem('hr_survey_responses') || '[]');
  
  const newResponse = {
    id: `response_${Date.now()}`,
    surveyId,
    employeeId,
    responses, // Array of answers
    timestamp: Date.now()
  };
  
  surveyResponses.push(newResponse);
  localStorage.setItem('hr_survey_responses', JSON.stringify(surveyResponses));
  
  return newResponse;
};

export const getSurveyResponses = (surveyId = null) => {
  const responses = JSON.parse(localStorage.getItem('hr_survey_responses') || '[]');
  
  if (surveyId) {
    return responses.filter(r => r.surveyId === surveyId);
  }
  
  return responses;
};

// Feedback Functions
export const submitFeedback = (employeeId, feedback, isAnonymous = false) => {
  const feedbacks = JSON.parse(localStorage.getItem('hr_feedback') || '[]');
  
  const newFeedback = {
    id: `feedback_${Date.now()}`,
    employeeId: isAnonymous ? null : employeeId,
    feedback,
    isAnonymous,
    timestamp: Date.now()
  };
  
  feedbacks.push(newFeedback);
  localStorage.setItem('hr_feedback', JSON.stringify(feedbacks));
  
  return newFeedback;
};

export const getFeedback = () => {
  const feedbacks = JSON.parse(localStorage.getItem('hr_feedback') || '[]');
  return feedbacks.sort((a, b) => b.timestamp - a.timestamp);
};

// Analytics Functions
export const getDashboardStats = () => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]');
  
  const totalEmployees = employees.length;
  const totalCheckIns = checkIns.length;
  
  // Calculate averages
  const avgHappiness = checkIns.length > 0
    ? checkIns.reduce((sum, c) => sum + (c.happiness || 0), 0) / checkIns.length
    : 0;
  
  const avgStress = checkIns.length > 0
    ? checkIns.reduce((sum, c) => sum + (c.stress || 0), 0) / checkIns.length
    : 0;
  
  const avgMotivation = checkIns.length > 0
    ? checkIns.reduce((sum, c) => sum + (c.motivation || 0), 0) / checkIns.length
    : 0;
  
  // Burnout detection
  const burnoutAlerts = detectBurnout(checkIns);
  
  return {
    totalEmployees,
    totalCheckIns,
    avgHappiness: parseFloat(avgHappiness.toFixed(2)),
    avgStress: parseFloat(avgStress.toFixed(2)),
    avgMotivation: parseFloat(avgMotivation.toFixed(2)),
    burnoutAlerts
  };
};

export const detectBurnout = (checkIns) => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  const alerts = [];
  
  employees.forEach(employee => {
    const employeeCheckIns = checkIns
      .filter(c => c.employeeId === employee.id)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5); // Last 5 check-ins
    
    if (employeeCheckIns.length >= 3) {
      const highStressLowMotivation = employeeCheckIns.filter(
        c => c.stress >= 4 && c.motivation <= 2
      );
      
      if (highStressLowMotivation.length >= 3) {
        alerts.push({
          employeeId: employee.id,
          employeeName: employee.name,
          department: employee.department,
          severity: 'high',
          message: 'High stress and low motivation detected'
        });
      }
    }
  });
  
  return alerts;
};

export const getDepartmentStats = () => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]');
  
  const departments = [...new Set(employees.map(e => e.department))];
  
  return departments.map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept);
    const deptEmployeeIds = deptEmployees.map(e => e.id);
    const deptCheckIns = checkIns.filter(c => deptEmployeeIds.includes(c.employeeId));
    
    const avgHappiness = deptCheckIns.length > 0
      ? deptCheckIns.reduce((sum, c) => sum + (c.happiness || 0), 0) / deptCheckIns.length
      : 0;
    
    const avgStress = deptCheckIns.length > 0
      ? deptCheckIns.reduce((sum, c) => sum + (c.stress || 0), 0) / deptCheckIns.length
      : 0;
    
    const avgMotivation = deptCheckIns.length > 0
      ? deptCheckIns.reduce((sum, c) => sum + (c.motivation || 0), 0) / deptCheckIns.length
      : 0;
    
    return {
      department: dept,
      employeeCount: deptEmployees.length,
      checkInCount: deptCheckIns.length,
      avgHappiness: parseFloat(avgHappiness.toFixed(2)),
      avgStress: parseFloat(avgStress.toFixed(2)),
      avgMotivation: parseFloat(avgMotivation.toFixed(2))
    };
  });
};

// Employee management
export const getEmployees = () => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  return employees.map(e => ({ ...e, password: undefined })); // Don't expose passwords
};

export const getEmployeeById = (employeeId) => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  const employee = employees.find(e => e.id === employeeId);
  return employee ? { ...employee, password: undefined } : null;
};

export const deleteEmployee = (employeeId) => {
  const employees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
  const filtered = employees.filter(e => e.id !== employeeId);
  localStorage.setItem('hr_employees', JSON.stringify(filtered));
  
  // Note: We keep their check-ins for historical data
};

// Trend data for charts
export const getTrendData = (days = 7) => {
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]');
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);
  
  const trendData = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayCheckIns = checkIns.filter(c => c.date === dateStr);
    
    if (dayCheckIns.length > 0) {
      trendData.push({
        date: dateStr,
        happiness: parseFloat((dayCheckIns.reduce((sum, c) => sum + c.happiness, 0) / dayCheckIns.length).toFixed(2)),
        stress: parseFloat((dayCheckIns.reduce((sum, c) => sum + c.stress, 0) / dayCheckIns.length).toFixed(2)),
        motivation: parseFloat((dayCheckIns.reduce((sum, c) => sum + c.motivation, 0) / dayCheckIns.length).toFixed(2)),
        count: dayCheckIns.length
      });
    } else {
      trendData.push({
        date: dateStr,
        happiness: 0,
        stress: 0,
        motivation: 0,
        count: 0
      });
    }
  }
  
  return trendData;
};

export const getEmployeeTrendData = (employeeId, days = 30) => {
  const checkIns = JSON.parse(localStorage.getItem('hr_mood_checkins') || '[]')
    .filter(c => c.employeeId === employeeId)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, days);
  
  return checkIns.reverse();
};
