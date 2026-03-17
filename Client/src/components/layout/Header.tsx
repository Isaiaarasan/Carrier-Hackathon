import { Bell, Sun, Moon, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useNotifStore } from '../../stores/notifStore'
import { useAuthStore } from '../../stores/authStore'

interface HeaderProps {
  title?: string
}

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  const { toggle, isDark } = useThemeStore()
  const { unreadCount } = useNotifStore()
  const { user } = useAuthStore()

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-border dark:border-gray-800 flex items-center px-6 gap-4 shrink-0">
      {/* Page title */}
      <h1 className="text-lg font-semibold text-secondary dark:text-white flex-1">{title}</h1>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 w-64">
        <Search size={15} className="text-muted" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-secondary dark:text-gray-200 placeholder-muted focus:outline-none w-full"
        />
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={toggle}
        className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-muted hover:text-primary-500 transition-colors"
        title="Toggle dark mode"
      >
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      {/* Notifications bell */}
      <Link to="/notifications" className="relative w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-muted hover:text-primary-500 transition-colors">
        <Bell size={17} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>

      {/* Avatar */}
      <Link to="/settings" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover" />
          ) : (
            <span className="text-white text-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </Link>
    </header>
  )
}
