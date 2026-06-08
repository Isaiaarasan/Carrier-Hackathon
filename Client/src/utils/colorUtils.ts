/**
 * Convert hex color to RGB
 */
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Convert RGB to hex
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join("")}`;
};

/**
 * Lighten a hex color by percentage
 */
export const lightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * (percent / 100)));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * (percent / 100)));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * (percent / 100)));

  return rgbToHex(r, g, b);
};

/**
 * Darken a hex color by percentage
 */
export const darkenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.max(0, Math.round(rgb.r * (1 - percent / 100)));
  const g = Math.max(0, Math.round(rgb.g * (1 - percent / 100)));
  const b = Math.max(0, Math.round(rgb.b * (1 - percent / 100)));

  return rgbToHex(r, g, b);
};

/**
 * Get contrast color (black or white) based on background brightness
 */
export const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#000000";

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

/**
 * Apply primary color and auto-generate related colors
 */
export const applyPrimaryColor = (primaryColor: string) => {
  const root = document.documentElement;
  const rgb = hexToRgb(primaryColor);

  root.style.setProperty("--primary", primaryColor);
  root.style.setProperty("--primary-hover", darkenColor(primaryColor, 15));

  if (rgb) {
    root.style.setProperty("--primary-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    const hoverColor = darkenColor(primaryColor, 15);
    const hoverRgb = hexToRgb(hoverColor);
    if (hoverRgb) {
      root.style.setProperty("--primary-hover-rgb", `${hoverRgb.r}, ${hoverRgb.g}, ${hoverRgb.b}`);
    }
  }
};
