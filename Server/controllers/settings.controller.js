import Settings from '../models/Settings.model.js';

/**
 * GET /api/theme
 * Get current theme settings
 */
export const getTheme = async (req, res) => {
  try {
    let settings = await Settings.findOne({ settingType: 'theme' });
    
    // Create default if doesn't exist
    if (!settings) {
      settings = await Settings.create({
        settingType: 'theme',
        theme: {
          primary: '#D4AF37',
          primaryHover: '#B8860B',
          accent: '#06D6A0',
          danger: '#EF233C',
          warning: '#FFB703',
          success: '#06D6A0',
          bgBase: '#FFFBF0',
          bgSurface: '#FFFFFF',
          bgSurface2: '#FFF9E6',
          bgSurface3: '#FFF2D0',
          textPrimary: '#1F1100',
          textSecondary: '#5C4B2E',
          textMuted: '#A89968',
        },
      });
    }

    res.status(200).json({ success: true, data: settings.theme });
  } catch (error) {
    console.error('[Get Theme Error]:', error.message);
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
      if (typeof value === 'string' && !hexRegex.test(value)) {
        return res.status(400).json({
          success: false,
          message: `Invalid hex color for ${key}: ${value}`,
        });
      }
    }

    let settings = await Settings.findOne({ settingType: 'theme' });
    
    if (!settings) {
      settings = new Settings({ settingType: 'theme' });
    }

    settings.theme = { ...settings.theme.toObject(), ...colorUpdates };
    settings.updatedAt = Date.now();
    await settings.save();

    res.status(200).json({ success: true, data: settings.theme });
  } catch (error) {
    console.error('[Update Theme Error]:', error.message);
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
      primary: '#D4AF37',
      primaryHover: '#B8860B',
      accent: '#06D6A0',
      danger: '#EF233C',
      warning: '#FFB703',
      success: '#06D6A0',
      bgBase: '#FFFBF0',
      bgSurface: '#FFFFFF',
      bgSurface2: '#FFF9E6',
      bgSurface3: '#FFF2D0',
      textPrimary: '#1F1100',
      textSecondary: '#5C4B2E',
      textMuted: '#A89968',
    };

    const settings = await Settings.findOneAndUpdate(
      { settingType: 'theme' },
      { theme: defaultTheme, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: settings.theme });
  } catch (error) {
    console.error('[Reset Theme Error]:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
