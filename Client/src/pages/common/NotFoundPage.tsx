import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

export default function NotFoundPage() {
  const { isAuthenticated, user } = useAuthStore()
  const dashboardHref = user?.role === 'manager' ? '/manager/dashboard' : user?.role === 'admin' ? '/admin/users' : '/intern/dashboard'

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="text-[120px] font-black text-primary-100 dark:text-primary-900/50 leading-none mb-6 select-none">404</div>
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-3">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          {isAuthenticated ? (
            <Link to={dashboardHref} className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all hover:shadow-glow">
              <Home size={16} /> Go to Dashboard
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all hover:shadow-glow">
              <Home size={16} /> Go Home
            </Link>
          )}
          <button onClick={() => window.history.back()} className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 hover:shadow-hover text-secondary dark:text-white font-semibold px-6 py-3 rounded-2xl transition-all">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
