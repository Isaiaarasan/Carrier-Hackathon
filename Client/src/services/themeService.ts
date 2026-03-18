import api from "./api";

export const themeService = {
  getTheme: () => api.get("/theme"),
  updateTheme: (colors: any) => api.patch("/theme", colors),
  resetTheme: () => api.post("/theme/reset"),
};
