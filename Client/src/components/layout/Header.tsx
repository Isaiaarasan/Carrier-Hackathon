import { Bell, Sun, Moon, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useNotifStore } from '../../stores/notifStore'
import { useAuthStore } from '../../stores/authStore'

interface HeaderProps { title?: string }

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  const { toggle, isDark } = useThemeStore()
  const { unreadCount } = useNotifStore()
  const { user } = useAuthStore()

  return (
    <header
      className="h-[68px] flex items-center px-6 gap-4 shrink-0"
      style={{
        background: 'var(--header-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--header-border)',
      }}>

      {/* Title */}
      <div className="flex-1">
        <h1 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
        <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>InternPulse Platform</p>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl w-60"
        style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}>
        <Search size={14} style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm focus:outline-none w-full"
          style={{ color: 'var(--text-primary)' }}
        />
        <kbd
          className="hidden lg:flex items-center text-[10px] px-1.5 py-0.5 rounded-md font-mono"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.15)', color: 'var(--primary)' }}>
          ⌘K
        </kbd>
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2">

        {/* Theme toggle — NOW shows current mode & toggles */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {isDark
            ? <Sun  size={16} style={{ color: '#FFB703' }} />
            : <Moon size={16} style={{ color: 'var(--primary)' }} />}
        </button>

        {/* AI Button */}
        <button
          className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
          title="AI Assistant">
          <Sparkles size={16} style={{ color: 'var(--primary)' }} />
        </button>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}>
          <Bell size={16} style={{ color: 'var(--text-muted)' }} />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold rounded-full flex items-center justify-center text-white"
              style={{ background: 'var(--primary)', boxShadow: '0 0 10px rgba(124,58,237,0.6)' }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Avatar */}
        <Link to="/settings" className="flex items-center gap-2.5 pl-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', boxShadow: '0 0 12px rgba(124,58,237,0.35)' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              {user?.name?.split(' ')[0]}
            </p>
            <p className="text-[10px] capitalize" style={{ color: 'var(--text-muted)' }}>{user?.role}</p>
          </div>
        </Link>
      </div>
    </header>
  )
}
