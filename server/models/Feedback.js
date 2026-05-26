import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Feedback extends Model {}

Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Can be null for anonymous feedback
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_anonymous',
    },
    category: {
      type: DataTypes.ENUM(
        'Work Environment',
        'Management',
        'Team',
        'Tools & Resources',
        'Growth & Development',
        'Other'
      ),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Category is required' },
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Subject is required' },
        len: {
          args: [5, 200],
          msg: 'Subject must be between 5 and 200 characters',
        },
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Message is required' },
        len: {
          args: [10, 2000],
          msg: 'Message must be between 10 and 2000 characters',
        },
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'resolved'),
      defaultValue: 'pending',
    },
    adminNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      field: 'admin_notes',
    },
    reviewedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'reviewed_by_id',
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reviewed_at',
    },
  },
  {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['category'] },
      { fields: ['status'] },
      { fields: ['reviewed_by_id'] },
    ],
  }
);

export default Feedback;
