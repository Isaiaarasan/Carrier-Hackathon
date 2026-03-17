import AppRouter from './router/AppRouter'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '13px',
            fontFamily: 'Inter, system-ui, sans-serif',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          },
        }}
      />
    </>
  )
}
