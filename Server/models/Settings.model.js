import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  settingType: {
    type: String,
    enum: ["theme", "system", "notification"],
    default: "theme",
  },
    // Shared brand colors
    primary: { type: String, default: "#7c3aed" },
    primaryHover: { type: String, default: "#6d28d9" },
    accent: { type: String, default: "#10b981" },
    danger: { type: String, default: "#ef4444" },
    warning: { type: String, default: "#f59e0b" },
    success: { type: String, default: "#10b981" },
    
    // Mode-specific colors
    light: {
      bgBase: { type: String, default: "#f8fafc" },
      bgSurface: { type: String, default: "#ffffff" },
      bgSurface2: { type: String, default: "#f1f5f9" },
      bgSurface3: { type: String, default: "#e2e8f0" },
      cardBg: { type: String, default: "#ffffff" },
      inputBg: { type: String, default: "#ffffff" },
      inputBorder: { type: String, default: "#e2e8f0" },
      borderColor: { type: String, default: "rgba(0, 0, 0, 0.08)" },
      textPrimary: { type: String, default: "#0f172a" },
      textSecondary: { type: String, default: "#334155" },
      textMuted: { type: String, default: "#64748b" },
      textInvert: { type: String, default: "#ffffff" },
    },
    dark: {
      bgBase: { type: String, default: "#020617" },
      bgSurface: { type: String, default: "#0f172a" },
      bgSurface2: { type: String, default: "#1e293b" },
      bgSurface3: { type: String, default: "#334155" },
      cardBg: { type: String, default: "#0f172a" },
      inputBg: { type: String, default: "#0f172a" },
      inputBorder: { type: String, default: "#1e293b" },
      borderColor: { type: String, default: "rgba(255, 255, 255, 0.08)" },
      textPrimary: { type: String, default: "#f8fafc" },
      textSecondary: { type: String, default: "#cbd5e1" },
      textMuted: { type: String, default: "#64748b" },
      textInvert: { type: String, default: "#020617" },
    },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Settings", settingsSchema);
