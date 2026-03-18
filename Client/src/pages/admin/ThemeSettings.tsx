import { useState, useEffect } from "react";
import { Palette, Save, RotateCcw, Layout, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "../../components/ui/Card";
import { themeService } from "../../services/themeService";
import { applyPrimaryColor } from "../../utils/colorUtils";

interface PaletteColors {
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

interface ThemeState {
  primary: string;
  primaryHover: string;
  accent: string;
  danger: string;
  warning: string;
  success: string;
  light: PaletteColors;
  dark: PaletteColors;
}

const colorFields = [
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

const sharedFields = [
  { key: "primary", label: "Primary Brand" },
  { key: "accent", label: "Accent Color" },
  { key: "danger", label: "Danger State" },
  { key: "warning", label: "Warning State" },
  { key: "success", label: "Success State" },
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
      light: {
        bgBase: "#f5f5f5",
        bgSurface: "#ffffff",
        bgSurface2: "#eeeeee",
        bgSurface3: "#dddddd",
        cardBg: "#ffffff",
        inputBg: "#ffffff",
        inputBorder: "#cccccc",
        borderColor: "rgba(0,0,0,0.1)",
        textPrimary: "#141414",
        textSecondary: "#333333",
        textMuted: "#666666",
        textInvert: "#ffffff",
      },
      dark: {
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
  },
  amazon: {
    name: "Amazon",
    icon: "🔶",
    colors: {
      primary: "#FF9900",
      primaryHover: "#E68A00",
      accent: "#232F3E",
      danger: "#B12704",
      warning: "#FFA41C",
      success: "#067D62",
      light: {
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
      dark: {
        bgBase: "#131A22",
        bgSurface: "#232F3E",
        bgSurface2: "#37475A",
        bgSurface3: "#485769",
        cardBg: "#232F3E",
        inputBg: "#131A22",
        inputBorder: "#3a4553",
        borderColor: "rgba(255,255,255,0.1)",
        textPrimary: "#FFFFFF",
        textSecondary: "#CCCCCC",
        textMuted: "#888888",
        textInvert: "#131A22",
      },
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
      light: {
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
      dark: {
        bgBase: "#172337",
        bgSurface: "#21314d",
        bgSurface2: "#2a3d5f",
        bgSurface3: "#354c73",
        cardBg: "#21314d",
        inputBg: "#172337",
        inputBorder: "#2a3d5f",
        borderColor: "rgba(255,255,255,0.1)",
        textPrimary: "#FFFFFF",
        textSecondary: "#AEAEAE",
        textMuted: "#878787",
        textInvert: "#172337",
      },
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
      light: {
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
      dark: {
        bgBase: "#020617",
        bgSurface: "#0f172a",
        bgSurface2: "#1e293b",
        bgSurface3: "#334155",
        cardBg: "#0f172a",
        inputBg: "#0f172a",
        inputBorder: "#1e293b",
        borderColor: "rgba(255,255,255,0.08)",
        textPrimary: "#f8fafc",
        textSecondary: "#cbd5e1",
        textMuted: "#64748b",
        textInvert: "#020617",
      },
    },
  },
};

export default function ThemeSettings() {
  const [theme, setTheme] = useState<ThemeState | null>(null);
  const [activeMode, setActiveMode] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    setLoading(true);
    try {
      const res = await themeService.getTheme();
      setTheme(res.data.data);
    } catch (err) {
      console.error("Failed to load theme:", err);
      toast.error("Failed to load theme settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSharedChange = (key: string, value: string) => {
    if (theme) setTheme({ ...theme, [key]: value });
  };

  const handleModeChange = (key: keyof PaletteColors, value: string) => {
    if (theme) {
      setTheme({
        ...theme,
        [activeMode]: { ...theme[activeMode], [key]: value },
      });
    }
  };

  const applyPreset = (presetKey: keyof typeof themePresets) => {
    const preset = themePresets[presetKey];
    if (preset) {
      setTheme(preset.colors as ThemeState);
      setCSSVariables(preset.colors as ThemeState); // Apply immediately to UI
      toast.success(`Loaded ${preset.name} brand assets!`);
    }
  };

  const setCSSVariables = (t: ThemeState) => {
    const root = document.documentElement;
    // We apply shared colors
    applyPrimaryColor(t.primary);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--danger", t.danger);
    root.style.setProperty("--warning", t.warning);
    root.style.setProperty("--success", t.success);
    
    // Note: Mode-specific variables will be handled by the useTheme hook 
    // when mode is toggled or after save.
  };

  const handleSave = async () => {
    if (!theme) return;
    setSaving(true);
    try {
      await themeService.updateTheme(theme);
      setCSSVariables(theme);
      toast.success("Brand identity synchronized globally!");
    } catch (err: any) {
      toast.error("Failed to save theme");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset to factory defaults?")) return;
    try {
      const res = await themeService.resetTheme();
      setTheme(res.data.data);
      setCSSVariables(res.data.data);
      toast.success("Theme restored!");
    } catch {
      toast.error("Reset failed");
    }
  };

  if (loading) return <div className="p-8 text-center text-muted">Intializing Design System...</div>;
  if (!theme) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette size={16} /> Theme Customization
          </CardTitle>
        </CardHeader>
        <CardBody className="space-y-8">
          {/* Brand Presets */}
          <div>
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Official Brand Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(themePresets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key as keyof typeof themePresets)}
                  className="p-4 rounded-3xl border-2 border-border hover:border-primary transition-all flex flex-col items-center gap-2 group bg-surface-50"
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <div className="w-full h-1.5 rounded-full overflow-hidden flex">
                     <div className="flex-1" style={{ backgroundColor: preset.colors.primary }} />
                     <div className="flex-1" style={{ backgroundColor: preset.colors.accent }} />
                  </div>
                  <span className="text-[10px] font-bold text-primaryText">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Global Brand Colors */}
            <div className="lg:col-span-1 border-r border-border pr-8 space-y-6">
               <h3 className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2"><Layout size={14}/> Shared Assets</h3>
               <div className="space-y-4">
                 {sharedFields.map(field => (
                   <div key={field.key} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted uppercase">{field.label}</label>
                      <div className="flex gap-2">
                        <input type="color" value={theme[field.key as keyof ThemeState] as string} onChange={e => handleSharedChange(field.key, e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer border border-border" />
                        <input type="text" value={theme[field.key as keyof ThemeState] as string} onChange={e => handleSharedChange(field.key, e.target.value)} className="flex-1 px-3 py-1 bg-surface-50 border border-border rounded-xl text-xs font-mono" />
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Mode Specific Config */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between">
                 <h3 className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">Mode Specific Surfaces</h3>
                 <div className="flex p-1 bg-surface-50 rounded-2xl border border-border">
                    <button onClick={() => setActiveMode('light')} className={`px-4 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-2 transition-all ${activeMode === 'light' ? 'bg-surface shadow-sm text-primary' : 'text-muted'}`}>
                      <Sun size={12}/> Light Mode
                    </button>
                    <button onClick={() => setActiveMode('dark')} className={`px-4 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-2 transition-all ${activeMode === 'dark' ? 'bg-surface shadow-sm text-primary' : 'text-muted'}`}>
                      <Moon size={12}/> Dark Mode
                    </button>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                 {colorFields.map(field => (
                   <div key={field.key} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted uppercase">{field.label}</label>
                      <div className="flex gap-2">
                        <input type="color" value={theme[activeMode][field.key as keyof PaletteColors]} onChange={e => handleModeChange(field.key as keyof PaletteColors, e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border border-border" />
                        <input type="text" value={theme[activeMode][field.key as keyof PaletteColors]} onChange={e => handleModeChange(field.key as keyof PaletteColors, e.target.value)} className="flex-1 px-3 py-1 bg-surface-50 border border-border rounded-xl text-[10px] font-mono" />
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-border">
            <Button onClick={handleSave} disabled={saving} className="flex-1 h-12 rounded-2xl"><Save size={16} className="mr-2"/> Build Design System</Button>
            <Button onClick={handleReset} variant="secondary" className="h-12 px-6 rounded-2xl"><RotateCcw size={16}/></Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
