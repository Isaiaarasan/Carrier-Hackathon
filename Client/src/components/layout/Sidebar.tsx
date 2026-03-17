import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Users, Target, FileText, BarChart3, Bell, 
  Settings, HelpCircle, LogOut, UserCircle, Kanban, Calendar,
  Trophy, ChevronLeft, ChevronRight, Shield
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { cn } from '../../utils/cn'
import { useState } from 'react'

const internMenu = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/intern/dashboard' },
  { icon: Target, label: 'My Goals', to: '/intern/goals' },
  { icon: FileText, label: 'Submit Report', to: '/intern/reports/new' },
  { icon: FileText, label: 'Report History', to: '/intern/reports/history' },
  { icon: Trophy, label: 'Leaderboard', to: '/intern/leaderboard' },
]

const managerMenu = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/manager/dashboard' },
  { icon: Users, label: 'Interns', to: '/manager/interns' },
  { icon: Target, label: 'Create Goal', to: '/manager/goals/create' },
  { icon: FileText, label: 'Review Queue', to: '/manager/reviews' },
  { icon: BarChart3, label: 'Analytics', to: '/manager/analytics' },
]

const adminMenu = [
  { icon: Shield, label: 'User Management', to: '/admin/users' },
  { icon: Users, label: 'Cohorts', to: '/admin/cohorts' },
  { icon: Bell, label: 'Notif Logs', to: '/admin/notification-logs' },
  { icon: Settings, label: 'System Settings', to: '/admin/settings' },
]

const commonMenu = [
  { icon: Bell, label: 'Notifications', to: '/notifications' },
  { icon: Kanban, label: 'Kanban Board', to: '/kanban' },
  { icon: Calendar, label: 'Calendar', to: '/calendar' },
  { icon: Settings, label: 'Settings', to: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', to: '/help' },
]

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const roleMenu =
    user?.role === 'manager' ? managerMenu :
    user?.role === 'admin'   ? adminMenu   : internMenu

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={cn(
      'h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-border dark:border-gray-800 transition-all duration-300 relative',
      collapsed ? 'w-[68px]' : 'w-[260px]'
    )}>
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 h-16 border-b border-border dark:border-gray-800 shrink-0',
        collapsed && 'justify-center px-2'
      )}>
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">IP</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-secondary dark:text-white">InternPulse</p>
            <p className="text-xs text-muted capitalize">{user?.role} Portal</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {/* Role-specific */}
        <div className="space-y-0.5">
          {!collapsed && <p className="text-xs font-semibold text-muted uppercase px-3 pb-1">Menu</p>}
          {roleMenu.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn('sidebar-item', isActive && 'active', collapsed && 'justify-center px-2')
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border dark:border-gray-800 my-2" />

        {/* Common */}
        <div className="space-y-0.5">
          {!collapsed && <p className="text-xs font-semibold text-muted uppercase px-3 pb-1">General</p>}
          {commonMenu.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn('sidebar-item', isActive && 'active', collapsed && 'justify-center px-2')
              }
              title={collapsed ? label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User card + Logout */}
      <div className="border-t border-border dark:border-gray-800 p-3 space-y-2 shrink-0">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover" />
            ) : (
              <span className="text-white text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-secondary dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-muted truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-colors',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={16} />
          {!collapsed && 'Logout'}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-border dark:border-gray-700 flex items-center justify-center shadow-sm text-muted hover:text-primary-500 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
