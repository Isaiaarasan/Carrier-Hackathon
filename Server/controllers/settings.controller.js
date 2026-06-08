import Settings from "../models/Settings.model.js";

const DEFAULT_THEME = {
  primary: "#7c3aed",
  primaryHover: "#6d28d9",
  accent: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  success: "#10b981",
  light: {
    bgBase: "#f8fafc",
    bgSurface: "#ffffff",
    bgSurface2: "#f1f5f9",
    bgSurface3: "#e2e8f0",
    cardBg: "#ffffff",
    inputBg: "#ffffff",
    inputBorder: "#e2e8f0",
    borderColor: "rgba(0, 0, 0, 0.08)",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    textMuted: "#64748b",
    textInvert: "#ffffff",
  },
  dark: {
    bgBase: "#020617",
    bgSurface: "#0f172a",
    bgSurface2: "#1e293b",
    bgSurface3: "#334155",
    cardBg: "#0f172a",
    inputBg: "#0f172a",
    inputBorder: "#1e293b",
    borderColor: "rgba(255, 255, 255, 0.08)",
    textPrimary: "#f8fafc",
    textSecondary: "#cbd5e1",
    textMuted: "#64748b",
    textInvert: "#020617",
  },
};

export const getTheme = async (req, res) => {
  try {
    let settings = await Settings.findOne({ settingType: "theme" });

    if (!settings) {
      settings = await Settings.create({
        settingType: "theme",
        ...DEFAULT_THEME
      });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("[Get Theme Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTheme = async (req, res) => {
  try {
    const updates = req.body;
    let settings = await Settings.findOne({ settingType: "theme" });

    if (!settings) {
      settings = new Settings({ settingType: "theme" });
    }

    // Merge shared and mode-specific updates
    if (updates.primary) settings.primary = updates.primary;
    if (updates.primaryHover) settings.primaryHover = updates.primaryHover;
    if (updates.accent) settings.accent = updates.accent;
    if (updates.danger) settings.danger = updates.danger;
    if (updates.warning) settings.warning = updates.warning;
    if (updates.success) settings.success = updates.success;
    
    if (updates.light) settings.light = { ...settings.light, ...updates.light };
    if (updates.dark) settings.dark = { ...settings.dark, ...updates.dark };

    settings.updatedAt = Date.now();
    await settings.save();

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("[Update Theme Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetTheme = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { settingType: "theme" },
      { ...DEFAULT_THEME, updatedAt: Date.now() },
      { new: true, upsert: true },
    );

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("[Reset Theme Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
