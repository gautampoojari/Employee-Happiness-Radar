import express from 'express';
import { Survey, SurveyResponse, User } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/survey/active
// @desc    Get all active surveys
// @access  Private (Employee)
router.get('/active', authenticate, async (req, res) => {
  try {
    const surveys = await Survey.findAll({ 
      where: { isActive: true },
      include: [{
        model: User,
        as: 'createdBy',
        attributes: ['name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    // Check which surveys the user has already completed
    const userResponses = await SurveyResponse.findAll({ 
      where: { userId: req.user.id },
      attributes: ['surveyId']
    });
    
    const completedSurveyIds = userResponses.map(r => r.surveyId);
    
    const surveysWithStatus = surveys.map(survey => ({
      ...survey.toJSON(),
      isCompleted: completedSurveyIds.includes(survey.id)
    }));
    
    res.json({ surveys: surveysWithStatus });
  } catch (error) {
    console.error('Get active surveys error:', error);
    res.status(500).json({ message: 'Error fetching surveys', error: error.message });
  }
});

// @route   GET /api/survey/:id
// @desc    Get survey by ID
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'createdBy',
        attributes: ['name', 'email']
      }]
    });
    
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    
    // Check if user has completed this survey
    const response = await SurveyResponse.findOne({
      where: {
        surveyId: survey.id,
        userId: req.user.id
      }
    });
    
    res.json({
      survey,
      isCompleted: !!response,
      userResponse: response || null
    });
  } catch (error) {
    console.error('Get survey error:', error);
    res.status(500).json({ message: 'Error fetching survey', error: error.message });
  }
});

// @route   POST /api/survey/:id/respond
// @desc    Submit survey response
// @access  Private (Employee)
router.post('/:id/respond', authenticate, async (req, res) => {
  try {
    const { answers } = req.body;
    
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Please provide survey responses' });
    }
    
    // Check if survey exists and is active
    const survey = await Survey.findByPk(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    
    if (!survey.isActive) {
      return res.status(400).json({ message: 'This survey is no longer active' });
    }
    
    // Check if user already responded
    const existingResponse = await SurveyResponse.findOne({
      where: {
        surveyId: survey.id,
        userId: req.user.id
      }
    });
    
    if (existingResponse) {
      return res.status(400).json({ message: 'You have already completed this survey' });
    }
    
    // Validate responses match questions
    if (answers.length !== survey.questions.length) {
      return res.status(400).json({ message: 'Invalid number of responses' });
    }
    
    // Create response - use 'answers' field as defined in model
    const surveyResponse = await SurveyResponse.create({
      surveyId: survey.id,
      userId: req.user.id,
      answers: answers // Changed from 'responses' to 'answers' to match model
    });
    
    console.log(`✅ Survey response submitted by ${req.user.name} for survey: ${survey.title}`);
    
    res.status(201).json({
      message: 'Survey response submitted successfully',
      response: surveyResponse
    });
  } catch (error) {
    console.error('Submit survey response error:', error);
    res.status(500).json({ message: 'Error submitting survey response', error: error.message });
  }
});

// @route   GET /api/survey/my/responses
// @desc    Get current user's survey responses
// @access  Private (Employee)
router.get('/my/responses', authenticate, async (req, res) => {
  try {
    const responses = await SurveyResponse.findAll({ 
      where: { userId: req.user.id },
      include: [{
        model: Survey,
        as: 'survey',
        attributes: ['title', 'description', 'createdAt']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ responses });
  } catch (error) {
    console.error('Get user responses error:', error);
    res.status(500).json({ message: 'Error fetching responses', error: error.message });
  }
});

export default router;