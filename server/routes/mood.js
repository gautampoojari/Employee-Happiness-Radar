import express from 'express';
import { MoodCheckIn, User } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = express.Router();

// @route   POST /api/mood/checkin
// @desc    Create new mood check-in
// @access  Private (Employee)
router.post('/checkin', authenticate, async (req, res) => {
  try {
    const { happiness, stress, motivation, hydration, notes } = req.body;
    
    // Validation
    if (!happiness || !stress || !motivation || hydration === undefined) {
      return res.status(400).json({ message: 'Please provide all required mood ratings' });
    }
    
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already checked in today
    const existingCheckIn = await MoodCheckIn.findOne({
      where: {
        userId: req.user.id,
        date: today
      }
    });
    
    if (existingCheckIn) {
      // Update existing check-in instead of creating duplicate
      existingCheckIn.happiness = happiness;
      existingCheckIn.stress = stress;
      existingCheckIn.motivation = motivation;
      existingCheckIn.hydration = hydration;
      existingCheckIn.notes = notes || '';
      
      await existingCheckIn.save();
      
      // Get updated user data
      const user = await User.findByPk(req.user.id);
      
      return res.json({
        message: 'Mood check-in updated successfully',
        checkIn: existingCheckIn,
        streak: user.streak || 0
      });
    }
    
    // Create new check-in
    const checkIn = await MoodCheckIn.create({
      userId: req.user.id,
      happiness,
      stress,
      motivation,
      hydration,
      notes: notes || '',
      date: today
    });
    
    // Update user streak
    await updateUserStreak(req.user.id);
    
    // Get updated user data
    const user = await User.findByPk(req.user.id);
    
    res.status(201).json({
      message: 'Mood check-in created successfully',
      checkIn,
      streak: user.streak || 0
    });
  } catch (error) {
    console.error('Mood check-in error:', error);
    res.status(500).json({ message: 'Error creating mood check-in', error: error.message });
  }
});

// @route   GET /api/mood/my-checkins
// @desc    Get current user's mood check-ins
// @access  Private (Employee)
router.get('/my-checkins', authenticate, async (req, res) => {
  try {
    const { limit = 30, page = 1 } = req.query;
    
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    const { count, rows: checkIns } = await MoodCheckIn.findAndCountAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset
    });
    
    res.json({
      checkIns,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get check-ins error:', error);
    res.status(500).json({ message: 'Error fetching check-ins', error: error.message });
  }
});

// @route   GET /api/mood/my-streak
// @desc    Get current user's check-in streak
// @access  Private (Employee)
router.get('/my-streak', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Calculate actual streak based on lastCheckIn date
    let actualStreak = user.streak || 0;
    
    if (user.lastCheckIn) {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const lastCheckInDate = new Date(user.lastCheckIn).toISOString().split('T')[0];
      
      // If last check-in was before yesterday, streak should be 0
      if (lastCheckInDate !== today && lastCheckInDate !== yesterday) {
        actualStreak = 0;
      }
    } else {
      // No check-ins yet
      actualStreak = 0;
    }
    
    res.json({
      streak: actualStreak,
      lastCheckIn: user.lastCheckIn
    });
  } catch (error) {
    console.error('Get streak error:', error);
    res.status(500).json({ message: 'Error fetching streak', error: error.message });
  }
});

// @route   GET /api/mood/today
// @desc    Get today's check-in for current user
// @access  Private (Employee)
router.get('/today', authenticate, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const checkIn = await MoodCheckIn.findOne({
      where: {
        userId: req.user.id,
        date: today
      }
    });
    
    res.json({
      checkIn: checkIn || null,
      hasCheckedInToday: !!checkIn
    });
  } catch (error) {
    console.error('Get today check-in error:', error);
    res.status(500).json({ message: 'Error fetching today\'s check-in', error: error.message });
  }
});

// @route   GET /api/mood/stats
// @desc    Get current user's mood statistics
// @access  Private (Employee)
router.get('/stats', authenticate, async (req, res) => {
  try {
    const checkIns = await MoodCheckIn.findAll({ 
      where: { userId: req.user.id } 
    });
    
    if (checkIns.length === 0) {
      return res.json({
        totalCheckIns: 0,
        averages: { happiness: 0, stress: 0, motivation: 0, hydration: 0 }
      });
    }
    
    const totals = checkIns.reduce((acc, checkIn) => {
      acc.happiness += checkIn.happiness;
      acc.stress += checkIn.stress;
      acc.motivation += checkIn.motivation;
      acc.hydration += checkIn.hydration;
      return acc;
    }, { happiness: 0, stress: 0, motivation: 0, hydration: 0 });
    
    const count = checkIns.length;
    
    res.json({
      totalCheckIns: count,
      averages: {
        happiness: parseFloat((totals.happiness / count).toFixed(2)),
        stress: parseFloat((totals.stress / count).toFixed(2)),
        motivation: parseFloat((totals.motivation / count).toFixed(2)),
        hydration: parseFloat((totals.hydration / count).toFixed(2))
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// Helper function to update user streak
async function updateUserStreak(userId) {
  try {
    const user = await User.findByPk(userId);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (!user.lastCheckIn) {
      // First check-in ever
      user.streak = 1;
    } else {
      const lastCheckInDate = new Date(user.lastCheckIn).toISOString().split('T')[0];
      
      if (lastCheckInDate === yesterday) {
        // Continuing streak
        user.streak = (user.streak || 0) + 1;
      } else if (lastCheckInDate === today) {
        // Already checked in today (updating check-in), don't change streak
        return;
      } else {
        // Missed days, reset streak
        user.streak = 1;
      }
    }
    
    user.lastCheckIn = new Date();
    await user.save();
  } catch (error) {
    console.error('Error updating streak:', error);
  }
}

export default router;