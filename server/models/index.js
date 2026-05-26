import sequelize from '../config/database.js';
import User from './User.js';
import MoodCheckIn from './MoodCheckIn.js';
import Survey from './Survey.js';
import SurveyResponse from './SurveyResponse.js';
import Feedback from './Feedback.js';
import AdminToken from './AdminToken.js';

// Define relationships

// User -> MoodCheckIn (One-to-Many)
User.hasMany(MoodCheckIn, {
  foreignKey: 'userId',
  as: 'moodCheckIns',
  onDelete: 'CASCADE',
});
MoodCheckIn.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User -> Survey (One-to-Many, as creator)
User.hasMany(Survey, {
  foreignKey: 'createdById',
  as: 'createdSurveys',
  onDelete: 'SET NULL',
});
Survey.belongsTo(User, {
  foreignKey: 'createdById',
  as: 'createdBy',
});

// Survey -> SurveyResponse (One-to-Many)
Survey.hasMany(SurveyResponse, {
  foreignKey: 'surveyId',
  as: 'responses',
  onDelete: 'CASCADE',
});
SurveyResponse.belongsTo(Survey, {
  foreignKey: 'surveyId',
  as: 'survey',
});

// User -> SurveyResponse (One-to-Many)
User.hasMany(SurveyResponse, {
  foreignKey: 'userId',
  as: 'surveyResponses',
  onDelete: 'CASCADE',
});
SurveyResponse.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User -> Feedback (One-to-Many, as submitter)
User.hasMany(Feedback, {
  foreignKey: 'userId',
  as: 'feedbacks',
  onDelete: 'SET NULL',
});
Feedback.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User -> Feedback (One-to-Many, as reviewer)
User.hasMany(Feedback, {
  foreignKey: 'reviewedById',
  as: 'reviewedFeedbacks',
  onDelete: 'SET NULL',
});
Feedback.belongsTo(User, {
  foreignKey: 'reviewedById',
  as: 'reviewedBy',
});

// User -> AdminToken (One-to-Many, as creator)
User.hasMany(AdminToken, {
  foreignKey: 'createdById',
  as: 'createdTokens',
  onDelete: 'SET NULL',
});
AdminToken.belongsTo(User, {
  foreignKey: 'createdById',
  as: 'createdBy',
});

// User -> AdminToken (One-to-Many, as user of token)
User.hasMany(AdminToken, {
  foreignKey: 'usedById',
  as: 'usedTokens',
  onDelete: 'SET NULL',
});
AdminToken.belongsTo(User, {
  foreignKey: 'usedById',
  as: 'usedBy',
});

// Sync database
export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
    throw error;
  }
};

export {
  sequelize,
  User,
  MoodCheckIn,
  Survey,
  SurveyResponse,
  Feedback,
  AdminToken,
};
