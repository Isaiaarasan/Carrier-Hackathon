import { useEffect } from "react";
import { themeService } from "../services/themeService";
import { applyPrimaryColor } from "../utils/colorUtils";
import { useThemeStore } from "../stores/themeStore";

export const useTheme = () => {
  const { isDark } = useThemeStore();

  useEffect(() => {
    const applyTheme = async () => {
      try {
        const res = await themeService.getTheme();
        const theme = res.data.data;

        if (theme) {
          const root = document.documentElement;

          // Apply shared brand colors
          applyPrimaryColor(theme.primary);
          root.style.setProperty("--accent", theme.accent);
          root.style.setProperty("--danger", theme.danger);
          root.style.setProperty("--warning", theme.warning);
          root.style.setProperty("--success", theme.success);

          // Select palette based on mode
          const palette = isDark ? theme.dark : theme.light;

          if (palette) {
            root.style.setProperty("--bg-base", palette.bgBase);
            root.style.setProperty("--bg-surface", palette.bgSurface);
            root.style.setProperty("--bg-surface-2", palette.bgSurface2);
            root.style.setProperty("--bg-surface-3", palette.bgSurface3);
            root.style.setProperty("--card-bg", palette.cardBg);
            root.style.setProperty("--input-bg", palette.inputBg);
            root.style.setProperty("--input-border", palette.inputBorder);
            root.style.setProperty("--border-color", palette.borderColor);
            root.style.setProperty("--text-primary", palette.textPrimary);
            root.style.setProperty("--text-secondary", palette.textSecondary);
            root.style.setProperty("--text-muted", palette.textMuted);
            root.style.setProperty("--text-invert", palette.textInvert);
          }
        }
      } catch (err) {
        console.error("Failed to load theme:", err);
      }
    };

    applyTheme();
  }, [isDark]);
};
