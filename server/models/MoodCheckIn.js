import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class MoodCheckIn extends Model {}

MoodCheckIn.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Date is required' },
      },
    },
    happiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Happiness must be at least 1',
        },
        max: {
          args: [5],
          msg: 'Happiness must not exceed 5',
        },
      },
    },
    stress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Stress must be at least 1',
        },
        max: {
          args: [5],
          msg: 'Stress must not exceed 5',
        },
      },
    },
    motivation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Motivation must be at least 1',
        },
        max: {
          args: [5],
          msg: 'Motivation must not exceed 5',
        },
      },
    },
    hydration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Hydration must be at least 1',
        },
        max: {
          args: [5],
          msg: 'Hydration must not exceed 5',
        },
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'MoodCheckIn',
    tableName: 'mood_check_ins',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['date'] },
      { fields: ['user_id', 'date'], unique: true },
    ],
  }
);

export default MoodCheckIn;
