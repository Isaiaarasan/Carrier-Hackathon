import Settings from "../models/Settings.model.js";

/**
 * GET /api/theme
 * Get current theme settings
 */
export const getTheme = async (req, res) => {
  try {
    let settings = await Settings.findOne({ settingType: "theme" });

    // Create default if doesn't exist
    if (!settings) {
      settings = await Settings.create({
        settingType: "theme",
        theme: {
          primary: "#7c3aed",
          primaryHover: "#6d28d9",
          accent: "#10b981",
          danger: "#ef4444",
          warning: "#f59e0b",
          success: "#10b981",
          bgBase: "#f8fafc",
          bgSurface: "#ffffff",
          bgSurface2: "#f1f5f9",
          bgSurface3: "#e2e8f0",
          textPrimary: "#0f172a",
          textSecondary: "#334155",
          textMuted: "#64748b",
        },
      });
    }

    res.status(200).json({ success: true, data: settings.theme });
  } catch (error) {
    console.error("[Get Theme Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * PATCH /api/theme
 * Update theme colors (Admin Only)
 */
export const updateTheme = async (req, res) => {
  try {
    const colorUpdates = req.body;

    // Validate hex colors
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    for (const [key, value] of Object.entries(colorUpdates)) {
      if (typeof value === "string" && !hexRegex.test(value)) {
        return res.status(400).json({
          success: false,
          message: `Invalid hex color for ${key}: ${value}`,
        });
      }
    }

    let settings = await Settings.findOne({ settingType: "theme" });

    if (!settings) {
      settings = new Settings({ settingType: "theme" });
    }

    settings.theme = { ...settings.theme.toObject(), ...colorUpdates };
    settings.updatedAt = Date.now();
    await settings.save();

    res.status(200).json({ success: true, data: settings.theme });
  } catch (error) {
    console.error("[Update Theme Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/theme/reset
 * Reset theme to defaults (Admin Only)
 */
export const resetTheme = async (req, res) => {
  try {
    const defaultTheme = {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      accent: "#10b981",
      danger: "#ef4444",
      warning: "#f59e0b",
      success: "#10b981",
      bgBase: "#f8fafc",
      bgSurface: "#ffffff",
      bgSurface2: "#f1f5f9",
      bgSurface3: "#e2e8f0",
      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textMuted: "#64748b",
    };

    const settings = await Settings.findOneAndUpdate(
      { settingType: "theme" },
      { theme: defaultTheme, updatedAt: Date.now() },
      { new: true, upsert: true },
    );

    res.status(200).json({ success: true, data: settings.theme });
  } catch (error) {
    console.error("[Reset Theme Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
