import { useState } from "react";
import { Palette } from "lucide-react";
import toast from "react-hot-toast";
import { themeService } from "../../services/themeService";
import { applyPrimaryColor } from "../../utils/colorUtils";

export default function QuickThemePickerSidebar() {
  const [showPicker, setShowPicker] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#d4af37");
  const [isSaving, setIsSaving] = useState(false);

  const presetColors = [
    "#d4af37", // Gold
    "#7c3aed", // Purple
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#f59e0b", // Amber
    "#10b981", // Emerald
    "#6366f1", // Indigo
    "#8b5cf6", // Violet
  ];

  const handleColorChange = async (
    color: string,
    fromCustom: boolean = false,
  ) => {
    setPrimaryColor(color);

    if (!fromCustom) {
      // Immediate preview
      applyPrimaryColor(color);

      // Save to backend
      setIsSaving(true);
      try {
        await themeService.updateTheme({
          primary: color,
          primaryHover: adjustColorBrightness(color, -20),
        });
        toast.success("Primary color updated!");
      } catch (err) {
        console.error("Failed to update color:", err);
        toast.error("Failed to update color");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCustomColorApply = async () => {
    applyPrimaryColor(primaryColor);
    setIsSaving(true);
    try {
      await themeService.updateTheme({
        primary: primaryColor,
        primaryHover: adjustColorBrightness(primaryColor, -20),
      });
      toast.success("Custom color applied!");
      setShowPicker(false);
    } catch (err) {
      console.error("Failed to apply color:", err);
      toast.error("Failed to apply color");
    } finally {
      setIsSaving(false);
    }
  };

  const adjustColorBrightness = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) + amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) + amt);
    const B = Math.max(0, (num & 0x0000ff) + amt);
    return "#" + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };

  return (
    <div className="mb-6 px-4">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all"
      >
        <Palette size={18} className="text-primary" />
        <span className="text-sm font-semibold text-primary">Theme Color</span>
        <div
          className="ml-auto w-6 h-6 rounded-lg border-2 border-primary/30"
          style={{ backgroundColor: primaryColor }}
        />
      </button>

      {showPicker && (
        <div className="mt-3 p-4 bg-surface dark:bg-surface rounded-xl border border-border dark:border-gray-700 space-y-3">
          {/* Preset Colors */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted uppercase">
              Presets
            </p>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    primaryColor === color
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent hover:border-primary/30"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Custom Color Picker */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted uppercase">Custom</p>
            <div className="flex gap-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border-2 border-border dark:border-gray-700"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-2 py-1 text-sm bg-bg-surface dark:bg-bg-surface border border-border dark:border-gray-700 rounded-lg font-mono"
              />
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleCustomColorApply}
            disabled={isSaving}
            className="w-full py-2 px-3 text-sm font-semibold rounded-lg bg-primary text-primary-text hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {isSaving ? "Applying..." : "Apply Color"}
          </button>
        </div>
      )}
    </div>
  );
}
