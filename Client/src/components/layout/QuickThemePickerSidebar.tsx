import { useState } from "react";
import { Palette } from "lucide-react";
import toast from "react-hot-toast";
import { themeService } from "../../services/themeService";
import { applyPrimaryColor } from "../../utils/colorUtils";

export default function QuickThemePickerSidebar() {
  const [showPicker, setShowPicker] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#7c3aed");
  const [isSaving, setIsSaving] = useState(false);

  const presetColors = [
    "#7c3aed", // Purple
    "#6366f1", // Indigo
    "#8b5cf6", // Violet
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#d4af37", // Gold
    "#10b981", // Emerald
    "#f59e0b", // Amber
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
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-50 hover:bg-surface-100 border border-border transition-all group"
      >
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Palette size={16} />
        </div>
        <span className="text-sm font-bold text-primaryText">Theme Color</span>
        <div
          className="ml-auto w-5 h-5 rounded-lg border-2 border-border shadow-sm group-hover:rotate-12 transition-transform"
          style={{ backgroundColor: primaryColor }}
        />
      </button>

      {showPicker && (
        <div className="mt-3 p-4 bg-surface rounded-3xl border border-border shadow-card space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Preset Colors */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-black text-muted uppercase tracking-widest pl-1">
              Premium Palettes
            </p>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded-xl border-2 transition-all relative overflow-hidden ${
                    primaryColor === color
                      ? "border-primary ring-4 ring-primary/10"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  {primaryColor === color && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Picker */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-black text-muted uppercase tracking-widest pl-1">Custom Brand</p>
            <div className="flex gap-2">
              <div className="relative w-12 h-10 rounded-xl overflow-hidden border border-border">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="absolute -inset-2 w-16 h-16 cursor-pointer bg-transparent border-none"
                />
              </div>
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-3 py-1 text-xs bg-surface-50 border border-border rounded-xl font-mono text-primaryText focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleCustomColorApply}
            disabled={isSaving}
            className="w-full py-2.5 px-3 text-xs font-bold rounded-xl bg-primary text-white hover:opacity-90 shadow-glow transition-all disabled:opacity-50 active:scale-95"
          >
            {isSaving ? "Syncing..." : "Apply Signature Shade"}
          </button>
        </div>
      )}
    </div>
  );
}
