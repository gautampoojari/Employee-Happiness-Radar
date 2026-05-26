import express from 'express';
import { Feedback, User } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit feedback (anonymous or identified)
// @access  Private (Employee)
router.post('/', authenticate, async (req, res) => {
  try {
    const { feedback, isAnonymous, category, subject, message } = req.body;
    
    // Handle simple feedback submission (feedback + isAnonymous)
    if (feedback) {
      const newFeedback = await Feedback.create({
        userId: isAnonymous ? null : req.user.id,
        category: 'General',
        subject: 'Employee Feedback',
        message: feedback.trim(),
        isAnonymous: !!isAnonymous
      });
      
      console.log(`✅ Feedback submitted by ${isAnonymous ? 'Anonymous' : req.user.name}`);
      
      return res.status(201).json({
        message: 'Feedback submitted successfully',
        feedback: newFeedback
      });
    }
    
    // Handle detailed feedback submission (category + subject + message)
    if (!category || !subject || !message) {
      return res.status(400).json({ message: 'Feedback content is required' });
    }
    
    const newFeedback = await Feedback.create({
      userId: isAnonymous ? null : req.user.id,
      category,
      subject: subject.trim(),
      message: message.trim(),
      isAnonymous: !!isAnonymous
    });
    
    console.log(`✅ Feedback submitted by ${isAnonymous ? 'Anonymous' : req.user.name}`);
    
    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: newFeedback
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// @route   GET /api/feedback/my-feedback
// @desc    Get current user's feedback (non-anonymous only)
// @access  Private (Employee)
router.get('/my-feedback', authenticate, async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({ 
      where: {
        userId: req.user.id,
        isAnonymous: false
      },
      include: [{
        model: User,
        as: 'reviewedBy',
        attributes: ['name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ feedbacks });
  } catch (error) {
    console.error('Get user feedback error:', error);
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

export default router;
