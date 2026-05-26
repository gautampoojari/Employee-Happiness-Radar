import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class SurveyResponse extends Model {}

SurveyResponse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'surveys',
        key: 'id',
      },
      field: 'survey_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Answers are required' },
        isValidAnswers(value) {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Response must have at least one answer');
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'SurveyResponse',
    tableName: 'survey_responses',
    indexes: [
      { fields: ['survey_id'] },
      { fields: ['user_id'] },
      { fields: ['survey_id', 'user_id'] },
    ],
  }
);

export default SurveyResponse;
