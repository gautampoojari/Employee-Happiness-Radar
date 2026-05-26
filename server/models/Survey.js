import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Survey extends Model {}

Survey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Survey title is required' },
        len: {
          args: [3, 200],
          msg: 'Title must be between 3 and 200 characters',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Questions are required' },
        isValidQuestions(value) {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error('Survey must have at least one question');
          }
          
          value.forEach((q, index) => {
            if (!q.id || !q.type || !q.question) {
              throw new Error(`Question ${index + 1} is missing required fields`);
            }
            
            if (!['rating', 'text'].includes(q.type)) {
              throw new Error(`Question ${index + 1} has invalid type`);
            }
            
            if (q.type === 'rating' && (!q.min || !q.max)) {
              throw new Error(`Rating question ${index + 1} must have min and max values`);
            }
          });
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'created_by_id',
    },
  },
  {
    sequelize,
    modelName: 'Survey',
    tableName: 'surveys',
    indexes: [
      { fields: ['created_by_id'] },
      { fields: ['isActive'] },
    ],
  }
);

export default Survey;
