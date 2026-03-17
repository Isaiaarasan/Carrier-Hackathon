import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, CheckCheck, Target, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { useNotifStore } from '../../stores/notifStore'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { timeAgo } from '../../utils/formatDate'
import { cn } from '../../utils/cn'

const typeIcon: Record<string, any> = {
  goal_assigned: Target,
  report_submitted: FileText,
  report_approved: CheckCircle,
  report_rejected: AlertCircle,
  reminder: Bell,
}
const typeVariant: Record<string, any> = {
  goal_assigned: 'primary',
  report_submitted: 'warning',
  report_approved: 'success',
  report_rejected: 'danger',
  reminder: 'gray',
}

export default function NotificationsCenter() {
  const { notifications, unreadCount, isLoading, fetchAll, markAllRead, markRead } = useNotifStore()

  useEffect(() => { fetchAll() }, [])

  const mockNotifs = [
    { _id: '1', type: 'goal_assigned', message: 'Manager assigned you "Build REST API with Express.js"', isRead: false, createdAt: new Date().toISOString() },
    { _id: '2', type: 'report_approved', message: 'Your report for "React Component Library" was approved with score 88!', isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { _id: '3', type: 'reminder', message: 'Friday reminder: Please submit your weekly report by 6PM today', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: '4', type: 'report_submitted', message: 'Rahul submitted Weekly Report 6 for your review', isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
  ]

  const displayNotifs = notifications.length > 0 ? notifications : mockNotifs

  return (
    <div className="page-container space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary dark:text-white">Notifications</h2>
          <p className="text-sm text-muted mt-1">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead}>
            <CheckCheck size={14} /> Mark all read
          </Button>
        )}
      </div>

      <Card>
        <CardBody className="divide-y divide-border dark:divide-gray-700 p-0">
          {displayNotifs.length === 0 ? (
            <div className="text-center py-16 text-muted">
              <Bell size={40} className="mx-auto mb-3 opacity-30" />
              <p>No notifications yet</p>
            </div>
          ) : displayNotifs.map((notif: any, i: number) => {
            const Icon = typeIcon[notif.type] || Bell
            return (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markRead(notif._id)}
                className={cn(
                  'flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                  !notif.isRead && 'bg-primary-50/60 dark:bg-primary-900/10'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                  !notif.isRead ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-gray-100 dark:bg-gray-800'
                )}>
                  <Icon size={18} className={!notif.isRead ? 'text-primary-500' : 'text-muted'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm leading-relaxed', !notif.isRead ? 'font-medium text-secondary dark:text-white' : 'text-gray-600 dark:text-gray-400')}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-muted mt-1">{timeAgo(notif.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={typeVariant[notif.type] || 'gray'} className="text-[10px]">
                    {notif.type.replace('_', ' ')}
                  </Badge>
                  {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                </div>
              </motion.div>
            )
          })}
        </CardBody>
      </Card>
    </div>
  )
}
