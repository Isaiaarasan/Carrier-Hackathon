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
  cardBg: string;
  inputBg: string;
  inputBorder: string;
  borderColor: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInvert: string;
}

const colorFields = [
  { key: "primary", label: "Primary Color", category: "Brand" },
  { key: "primaryHover", label: "Primary Hover", category: "Brand" },
  { key: "accent", label: "Accent Color", category: "Status" },
  { key: "danger", label: "Danger Color", category: "Status" },
  { key: "warning", label: "Warning Color", category: "Status" },
  { key: "success", label: "Success Color", category: "Status" },
  { key: "bgBase", label: "Page Background", category: "Surfaces" },
  { key: "bgSurface", label: "Surface Layer 1", category: "Surfaces" },
  { key: "bgSurface2", label: "Surface Layer 2", category: "Surfaces" },
  { key: "bgSurface3", label: "Surface Layer 3", category: "Surfaces" },
  { key: "cardBg", label: "Card Backdrop", category: "Elements" },
  { key: "inputBg", label: "Input Backdrop", category: "Elements" },
  { key: "inputBorder", label: "Input Border", category: "Elements" },
  { key: "borderColor", label: "Global Border", category: "Elements" },
  { key: "textPrimary", label: "Headline Text", category: "Typography" },
  { key: "textSecondary", label: "Body Text", category: "Typography" },
  { key: "textMuted", label: "Secondary Text", category: "Typography" },
  { key: "textInvert", label: "Contrast Text", category: "Typography" },
];

const themePresets = {
  netflix: {
    name: "Netflix",
    icon: "🎬",
    colors: {
      primary: "#E50914",
      primaryHover: "#B81D13",
      accent: "#E50914",
      danger: "#B81D13",
      warning: "#F5C518",
      success: "#46D369",
      bgBase: "#141414",
      bgSurface: "#181818",
      bgSurface2: "#232323",
      bgSurface3: "#2F2F2F",
      cardBg: "#181818",
      inputBg: "#333333",
      inputBorder: "#444444",
      borderColor: "rgba(255,255,255,0.1)",
      textPrimary: "#FFFFFF",
      textSecondary: "#E5E5E5",
      textMuted: "#B3B3B3",
      textInvert: "#000000",
    },
  },
  amazonPrime: {
    name: "Amazon Prime",
    icon: "📺",
    colors: {
      primary: "#00A8E1",
      primaryHover: "#0084A8",
      accent: "#FF9900",
      danger: "#EF233C",
      warning: "#FFB703",
      success: "#06D6A0",
      bgBase: "#1A242F",
      bgSurface: "#232F3E",
      bgSurface2: "#37475A",
      bgSurface3: "#485769",
      cardBg: "#232F3E",
      inputBg: "#131A22",
      inputBorder: "#3a4553",
      borderColor: "rgba(255,255,255,0.12)",
      textPrimary: "#FFFFFF",
      textSecondary: "#CCCCCC",
      textMuted: "#888888",
      textInvert: "#1A242F",
    },
  },
  flipkart: {
    name: "Flipkart",
    icon: "🛍️",
    colors: {
      primary: "#2874F0",
      primaryHover: "#1B5ABF",
      accent: "#FFC52B",
      danger: "#FF6161",
      warning: "#FFC52B",
      success: "#26A541",
      bgBase: "#F1F3F6",
      bgSurface: "#FFFFFF",
      bgSurface2: "#F8F9FA",
      bgSurface3: "#E0E0E0",
      cardBg: "#FFFFFF",
      inputBg: "#FFFFFF",
      inputBorder: "#dbdbdb",
      borderColor: "rgba(0,0,0,0.08)",
      textPrimary: "#212121",
      textSecondary: "#878787",
      textMuted: "#AEAEAE",
      textInvert: "#FFFFFF",
    },
  },
  amazon: {
    name: "Amazon",
    icon: "🔶",
    colors: {
      primary: "#FF9900",
      primaryHover: "#E68A00",
      accent: "#131921",
      danger: "#B12704",
      warning: "#FFA41C",
      success: "#067D62",
      bgBase: "#F3F3F3",
      bgSurface: "#FFFFFF",
      bgSurface2: "#FAFAFA",
      bgSurface3: "#EEEEEE",
      cardBg: "#FFFFFF",
      inputBg: "#FFFFFF",
      inputBorder: "#a6a6a6",
      borderColor: "rgba(0,0,0,0.1)",
      textPrimary: "#0F1111",
      textSecondary: "#565959",
      textMuted: "#767676",
      textInvert: "#FFFFFF",
    },
  },
  default: {
    name: "InternPulse Pro",
    icon: "✨",
    colors: {
      primary: "#7C3AED",
      primaryHover: "#6D28D9",
      accent: "#10B981",
      danger: "#EF4444",
      warning: "#F59E0B",
      success: "#10B981",
      bgBase: "#F8FAFC",
      bgSurface: "#FFFFFF",
      bgSurface2: "#F1F5F9",
      bgSurface3: "#E2E8F0",
      cardBg: "#FFFFFF",
      inputBg: "#FFFFFF",
      inputBorder: "#E2E8F0",
      borderColor: "rgba(0,0,0,0.08)",
      textPrimary: "#0F172A",
      textSecondary: "#334155",
      textMuted: "#64748B",
      textInvert: "#FFFFFF",
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

  const setCSSVariables = (c: ThemeColors) => {
    const root = document.documentElement;
    const mapping: Record<string, string> = {
      "--primary": c.primary,
      "--primary-hover": c.primaryHover,
      "--accent": c.accent,
      "--danger": c.danger,
      "--warning": c.warning,
      "--success": c.success,
      "--bg-base": c.bgBase,
      "--bg-surface": c.bgSurface,
      "--bg-surface-2": c.bgSurface2,
      "--bg-surface-3": c.bgSurface3,
      "--card-bg": c.cardBg,
      "--input-bg": c.inputBg,
      "--input-border": c.inputBorder,
      "--border-color": c.borderColor,
      "--text-primary": c.textPrimary,
      "--text-secondary": c.textSecondary,
      "--text-muted": c.textMuted,
      "--text-invert": c.textInvert,
    };
    Object.entries(mapping).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const handleSave = async () => {
    if (!colors) return;

    setSaving(true);
    try {
      await themeService.updateTheme(colors);
      setCSSVariables(colors);
      toast.success("Theme settings synchronized globally!");
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
      const newColors = res.data.data;
      setColors(newColors);
      setCSSVariables(newColors);
      toast.success("Theme restored to factory defaults!");
    } catch (err: any) {
      console.error("Failed to reset theme:", err);
      toast.error(err.response?.data?.message || "Failed to reset theme");
    }
  };

  const categories = ["Brand", "Status", "Surfaces", "Elements", "Typography"];
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
              <h3 className="text-sm font-semibold text-primaryText mb-4">
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
                    <p className="text-xs font-medium text-primaryText text-center">
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
                  <h3 className="text-sm font-semibold text-primaryText mb-3">
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
                <h3 className="text-sm font-semibold text-primaryText mb-3">
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
