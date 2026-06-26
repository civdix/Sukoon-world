import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import User from './User.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // Can be null if guest booking, though the requirements ask to associate it when they log in. Better to require it or link later. We will allow null initially.
    references: {
      model: User,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sessionType: {
    type: DataTypes.STRING, // e.g., 'Individual Counselling', 'Couples Therapy'
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER, // Store in smallest currency unit (paise for INR)
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending',
  },
  razorpayOrderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  razorpayPaymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  counsellorId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  counsellorName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  counsellorEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meetLink: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
});

// Relationships
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

export default Booking;
