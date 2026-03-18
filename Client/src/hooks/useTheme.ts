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

          // Text colors
          root.style.setProperty("--text-primary", colors.textPrimary);
          root.style.setProperty("--text-secondary", colors.textSecondary);
          root.style.setProperty("--text-muted", colors.textMuted);
        }
      } catch (err) {
        console.error("Failed to load theme:", err);
      }
    };

    applyTheme();
  }, []);
};
