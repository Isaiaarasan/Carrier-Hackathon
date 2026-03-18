import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  settingType: {
    type: String,
    enum: ['theme', 'system', 'notification'],
    default: 'theme',
  },
  theme: {
    primary: {
      type: String,
      default: '#D4AF37',
    },
    primaryHover: {
      type: String,
      default: '#B8860B',
    },
    accent: {
      type: String,
      default: '#06D6A0',
    },
    danger: {
      type: String,
      default: '#EF233C',
    },
    warning: {
      type: String,
      default: '#FFB703',
    },
    success: {
      type: String,
      default: '#06D6A0',
    },
    // Light theme
    bgBase: {
      type: String,
      default: '#FFFBF0',
    },
    bgSurface: {
      type: String,
      default: '#FFFFFF',
    },
    bgSurface2: {
      type: String,
      default: '#FFF9E6',
    },
    bgSurface3: {
      type: String,
      default: '#FFF2D0',
    },
    textPrimary: {
      type: String,
      default: '#1F1100',
    },
    textSecondary: {
      type: String,
      default: '#5C4B2E',
    },
    textMuted: {
      type: String,
      default: '#A89968',
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Settings', settingsSchema);
