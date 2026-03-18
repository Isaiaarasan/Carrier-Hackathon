import { useEffect } from "react";
import { themeService } from "../services/themeService";
import { applyPrimaryColor } from "../utils/colorUtils";

export const useTheme = () => {
  useEffect(() => {
    const applyTheme = async () => {
      try {
        const res = await themeService.getTheme();
        const colors = res.data.data;

        if (colors) {
          // Apply colors to CSS variables
          const root = document.documentElement;

          // Main colors
          applyPrimaryColor(colors.primary);

          // Accent colors
          root.style.setProperty("--accent", colors.accent);
          root.style.setProperty("--danger", colors.danger);
          root.style.setProperty("--warning", colors.warning);
          root.style.setProperty("--success", colors.success);

          // Background colors
          root.style.setProperty("--bg-base", colors.bgBase);
          root.style.setProperty("--bg-surface", colors.bgSurface);
          root.style.setProperty("--bg-surface-2", colors.bgSurface2);
          root.style.setProperty("--bg-surface-3", colors.bgSurface3);

          // UI Elements
          root.style.setProperty("--card-bg", colors.cardBg || colors.bgSurface);
          root.style.setProperty("--input-bg", colors.inputBg || colors.bgSurface);
          root.style.setProperty("--input-border", colors.inputBorder || colors.bgSurface3);
          root.style.setProperty("--border-color", colors.borderColor || "rgba(0,0,0,0.1)");

          // Text colors
          root.style.setProperty("--text-primary", colors.textPrimary);
          root.style.setProperty("--text-secondary", colors.textSecondary);
          root.style.setProperty("--text-muted", colors.textMuted);
          root.style.setProperty("--text-invert", colors.textInvert || "#ffffff");
        }
      } catch (err) {
        console.error("Failed to load theme:", err);
      }
    };

    applyTheme();
  }, []);
};
