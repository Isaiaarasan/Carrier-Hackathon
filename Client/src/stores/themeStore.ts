import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDark: boolean
  toggle: () => void
  setDark: (dark: boolean) => void
}

const applyTheme = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true, // default to dark
      toggle: () =>
        set((state) => {
          const next = !state.isDark
          applyTheme(next)
          return { isDark: next }
        }),
      setDark: (dark: boolean) => {
        applyTheme(dark)
        set({ isDark: dark })
      },
    }),
    { name: 'internpulse-theme' }
  )
)

// Immediately apply saved theme preference on module load
const saved = localStorage.getItem('internpulse-theme')
if (saved) {
  try {
    const parsed = JSON.parse(saved)
    applyTheme(parsed?.state?.isDark ?? true)
  } catch {
    applyTheme(true)
  }
} else {
  // Default to dark
  applyTheme(true)
}
