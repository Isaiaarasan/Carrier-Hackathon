import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import AIChatPanel from './AIChatPanel'
import { useChatStore } from '../../stores/chatStore'

const pageTitles: Record<string, string> = {
  '/intern/dashboard': 'Dashboard',
  '/intern/goals': 'My Goals',
  '/intern/reports/new': 'Submit Report',
  '/intern/reports/history': 'Report History',
  '/intern/leaderboard': 'Leaderboard',
  '/manager/dashboard': 'Manager Dashboard',
  '/manager/interns': 'Intern Directory',
  '/manager/goals/create': 'Create Goal',
  '/manager/reviews': 'Review Queue',
  '/manager/analytics': 'Analytics',
  '/admin/users': 'User Management',
  '/admin/cohorts': 'Cohorts & Batches',
  '/admin/notification-logs': 'Notification Logs',
  '/admin/settings': 'System Settings',
  '/notifications': 'Notifications',
  '/kanban': 'Kanban Board',
  '/calendar': 'Calendar',
  '/settings': 'Settings',
  '/help': 'Help & Support',
}

export default function AppLayout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] || 'InternPulse'
  const { isOpen, close } = useChatStore()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Global AI Chat Overlay */}
      <AIChatPanel isOpen={isOpen} onClose={close} />
    </div>
  )
}
