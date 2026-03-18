import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  settingType: {
    type: String,
    enum: ["theme", "system", "notification"],
    default: "theme",
  },
  theme: {
    primary: {
      type: String,
      default: "#D4AF37",
    },
    primaryHover: {
      type: String,
      default: "#B8860B",
    },
    accent: {
      type: String,
      default: "#06D6A0",
    },
    danger: {
      type: String,
      default: "#EF233C",
    },
    warning: {
      type: String,
      default: "#FFB703",
    },
    success: {
      type: String,
      default: "#06D6A0",
    },
    // Colors
    bgBase: { type: String, default: "#f8fafc" },
    bgSurface: { type: String, default: "#ffffff" },
    bgSurface2: { type: String, default: "#f1f5f9" },
    bgSurface3: { type: String, default: "#e2e8f0" },
    
    // UI Elements
    cardBg: { type: String, default: "#ffffff" },
    inputBg: { type: String, default: "#ffffff" },
    inputBorder: { type: String, default: "#e2e8f0" },
    borderColor: { type: String, default: "rgba(0, 0, 0, 0.08)" },
    
    // Text
    textPrimary: { type: String, default: "#0f172a" },
    textSecondary: { type: String, default: "#334155" },
    textMuted: { type: String, default: "#64748b" },
    textInvert: { type: String, default: "#ffffff" },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Settings", settingsSchema);
