import { useState, useEffect } from "react";
import { Palette, Save, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "../../components/ui/Card";
import { themeService } from "../../services/themeService";

interface ThemeColors {
  primary: string;
  primaryHover: string;
  accent: string;
  danger: string;
  warning: string;
  success: string;
  bgBase: string;
  bgSurface: string;
  bgSurface2: string;
  bgSurface3: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

const colorFields = [
  { key: "primary", label: "Primary Color", category: "Main" },
  { key: "primaryHover", label: "Primary Hover", category: "Main" },
  { key: "accent", label: "Accent Color", category: "Status" },
  { key: "danger", label: "Danger Color", category: "Status" },
  { key: "warning", label: "Warning Color", category: "Status" },
  { key: "success", label: "Success Color", category: "Status" },
  { key: "bgBase", label: "Background Base", category: "Light Theme" },
  { key: "bgSurface", label: "Background Surface", category: "Light Theme" },
  { key: "bgSurface2", label: "Background Surface 2", category: "Light Theme" },
  { key: "bgSurface3", label: "Background Surface 3", category: "Light Theme" },
  { key: "textPrimary", label: "Text Primary", category: "Light Theme" },
  { key: "textSecondary", label: "Text Secondary", category: "Light Theme" },
  { key: "textMuted", label: "Text Muted", category: "Light Theme" },
];

const themePresets = {
  netflix: {
    name: "Netflix",
    icon: "🎬",
    colors: {
      primary: "#E50914",
      primaryHover: "#B81D13",
      accent: "#E50914",
      danger: "#E50914",
      warning: "#FFB703",
      success: "#06D6A0",
      bgBase: "#0F0F0F",
      bgSurface: "#1A1A1A",
      bgSurface2: "#2A2A2A",
      bgSurface3: "#3A3A3A",
      textPrimary: "#FFFFFF",
      textSecondary: "#E0E0E0",
      textMuted: "#A0A0A0",
    },
  },
  amazonPrime: {
    name: "Amazon Prime",
    icon: "📺",
    colors: {
      primary: "#00A8E1",
      primaryHover: "#0084A8",
      accent: "#00A8E1",
      danger: "#EF233C",
      warning: "#FFB703",
      success: "#06D6A0",
      bgBase: "#F5F5F1",
      bgSurface: "#FFFFFF",
      bgSurface2: "#F0F0F0",
      bgSurface3: "#E8E8E8",
      textPrimary: "#0D0D0D",
      textSecondary: "#565656",
      textMuted: "#B0B0B0",
    },
  },
  flipkart: {
    name: "Flipkart",
    icon: "🛍️",
    colors: {
      primary: "#FFC52B",
      primaryHover: "#FFB813",
      accent: "#FFC52B",
      danger: "#EF233C",
      warning: "#FFB703",
      success: "#06D6A0",
      bgBase: "#F5F5F5",
      bgSurface: "#FFFFFF",
      bgSurface2: "#F0F0F0",
      bgSurface3: "#E8E8E8",
      textPrimary: "#0D0D0D",
      textSecondary: "#565656",
      textMuted: "#B0B0B0",
    },
  },
  amazon: {
    name: "Amazon",
    icon: "🔶",
    colors: {
      primary: "#FF9900",
      primaryHover: "#E68A00",
      accent: "#FF9900",
      danger: "#EF233C",
      warning: "#FFB703",
      success: "#06D6A0",
      bgBase: "#F5F5F5",
      bgSurface: "#FFFFFF",
      bgSurface2: "#F0F0F0",
      bgSurface3: "#E8E8E8",
      textPrimary: "#0D0D0D",
      textSecondary: "#565656",
      textMuted: "#B0B0B0",
    },
  },
  default: {
    name: "InternPulse Default",
    icon: "✨",
    colors: {
      primary: "#D4AF37",
      primaryHover: "#B8860B",
      accent: "#06D6A0",
      danger: "#EF233C",
      warning: "#FFB703",
      success: "#06D6A0",
      bgBase: "#FFFBF0",
      bgSurface: "#FFFFFF",
      bgSurface2: "#FFF9E6",
      bgSurface3: "#FFF2D0",
      textPrimary: "#1F1100",
      textSecondary: "#5C4B2E",
      textMuted: "#A89968",
    },
  },
};

export default function ThemeSettings() {
  const [colors, setColors] = useState<ThemeColors | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    setLoading(true);
    try {
      const res = await themeService.getTheme();
      setColors(res.data.data);
    } catch (err) {
      console.error("Failed to load theme:", err);
      toast.error("Failed to load theme settings");
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    if (colors) {
      setColors({ ...colors, [key]: value });
    }
  };

  const applyPreset = (presetKey: keyof typeof themePresets) => {
    const preset = themePresets[presetKey];
    if (preset) {
      setColors(preset.colors as ThemeColors);
      toast.success(`Applied ${preset.name} theme!`);
    }
  };

  const handleSave = async () => {
    if (!colors) return;

    setSaving(true);
    try {
      await themeService.updateTheme(colors);

      // Apply colors to CSS variables immediately
      const root = document.documentElement;
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--primary-hover", colors.primaryHover);
      root.style.setProperty("--accent", colors.accent);
      root.style.setProperty("--danger", colors.danger);
      root.style.setProperty("--warning", colors.warning);
      root.style.setProperty("--success", colors.success);
      root.style.setProperty("--bg-base", colors.bgBase);
      root.style.setProperty("--bg-surface", colors.bgSurface);
      root.style.setProperty("--bg-surface-2", colors.bgSurface2);
      root.style.setProperty("--bg-surface-3", colors.bgSurface3);
      root.style.setProperty("--text-primary", colors.textPrimary);
      root.style.setProperty("--text-secondary", colors.textSecondary);
      root.style.setProperty("--text-muted", colors.textMuted);

      toast.success("Theme colors updated successfully!");
    } catch (err: any) {
      console.error("Failed to save theme:", err);
      toast.error(err.response?.data?.message || "Failed to save theme");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset theme to default colors?")) return;

    try {
      const res = await themeService.resetTheme();
      setColors(res.data.data);

      // Apply default colors
      const root = document.documentElement;
      root.style.setProperty("--primary", res.data.data.primary);
      root.style.setProperty("--primary-hover", res.data.data.primaryHover);
      root.style.setProperty("--accent", res.data.data.accent);
      root.style.setProperty("--danger", res.data.data.danger);
      root.style.setProperty("--warning", res.data.data.warning);
      root.style.setProperty("--success", res.data.data.success);
      root.style.setProperty("--bg-base", res.data.data.bgBase);
      root.style.setProperty("--bg-surface", res.data.data.bgSurface);
      root.style.setProperty("--bg-surface-2", res.data.data.bgSurface2);
      root.style.setProperty("--bg-surface-3", res.data.data.bgSurface3);
      root.style.setProperty("--text-primary", res.data.data.textPrimary);
      root.style.setProperty("--text-secondary", res.data.data.textSecondary);
      root.style.setProperty("--text-muted", res.data.data.textMuted);

      toast.success("Theme reset to defaults!");
    } catch (err: any) {
      console.error("Failed to reset theme:", err);
      toast.error(err.response?.data?.message || "Failed to reset theme");
    }
  };

  const categories = ["Main", "Status", "Light Theme"];
  const getFieldsByCategory = (category: string) => {
    return colorFields.filter((f) => f.category === category);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette size={16} />
            Theme Customization
          </CardTitle>
        </CardHeader>
        <CardBody>
          {!loading && colors && (
            <div className="mb-8 pb-8 border-b border-border dark:border-gray-700">
              <h3 className="text-sm font-semibold text-secondary dark:text-white mb-4">
                Quick Presets
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {Object.entries(themePresets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() =>
                      applyPreset(key as keyof typeof themePresets)
                    }
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-200 group"
                  >
                    <div className="text-2xl">{preset.icon}</div>
                    <div
                      className="w-full h-6 rounded-lg"
                      style={{ backgroundColor: preset.colors.primary }}
                    />
                    <p className="text-xs font-medium text-secondary dark:text-white text-center">
                      {preset.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : colors ? (
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getFieldsByCategory(category).map((field) => (
                      <div key={field.key} className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-muted">
                          {field.label}
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={colors[field.key as keyof ThemeColors]}
                            onChange={(e) =>
                              handleColorChange(
                                field.key as keyof ThemeColors,
                                e.target.value,
                              )
                            }
                            className="w-12 h-10 rounded-lg cursor-pointer border border-border dark:border-gray-700"
                          />
                          <input
                            type="text"
                            value={colors[field.key as keyof ThemeColors]}
                            onChange={(e) =>
                              handleColorChange(
                                field.key as keyof ThemeColors,
                                e.target.value,
                              )
                            }
                            placeholder="#000000"
                            className="input-base flex-1 text-sm font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Preview Section */}
              <div className="border-t border-border dark:border-gray-700 pt-6">
                <h3 className="text-sm font-semibold text-secondary dark:text-white mb-3">
                  Preview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="p-6 rounded-xl text-white font-semibold text-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Primary Button
                  </div>
                  <div
                    className="p-6 rounded-xl text-white font-semibold text-center"
                    style={{ backgroundColor: colors.success }}
                  >
                    Success State
                  </div>
                  <div
                    className="p-6 rounded-xl text-white font-semibold text-center"
                    style={{ backgroundColor: colors.danger }}
                  >
                    Danger State
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border dark:border-gray-700">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Save size={15} /> {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="secondary"
                  className="flex items-center justify-center gap-2"
                >
                  <RotateCcw size={15} /> Reset
                </Button>
              </div>
            </div>
          ) : null}
        </CardBody>
      </Card>

      {/* Info Box */}
      <Card>
        <CardBody className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            💡 <strong>Tip:</strong> Changes to theme colors apply globally
            across the entire platform. All users will see the updated colors
            immediately after you save them.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
