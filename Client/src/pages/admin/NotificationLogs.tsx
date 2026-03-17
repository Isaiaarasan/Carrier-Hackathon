import { useState } from 'react'
import { Bell, Filter } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { timeAgo } from '../../utils/formatDate'

const mockLogs = [
  { _id: '1', type: 'goal_assigned', message: 'Rahul Kumar was assigned "Build REST API"', createdAt: new Date().toISOString(), isRead: true },
  { _id: '2', type: 'report_submitted', message: 'Priya submitted Weekly Report 6', createdAt: new Date().toISOString(), isRead: false },
  { _id: '3', type: 'report_approved', message: 'Arjun\'s report was approved with score 88', createdAt: new Date().toISOString(), isRead: true },
  { _id: '4', type: 'reminder', message: 'Friday reminder: 4 interns have pending reports', createdAt: new Date().toISOString(), isRead: false },
]

const typeColors: Record<string, any> = {
  goal_assigned: 'primary', report_submitted: 'warning',
  report_approved: 'success', reminder: 'gray',
}

export default function NotificationLogs() {
  const [logs] = useState(mockLogs)

  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary dark:text-white">Notification Logs</h2>
        <p className="text-sm text-muted mt-1">All platform notification history</p>
      </div>
      <Card>
        <CardHeader><CardTitle>System Notifications</CardTitle></CardHeader>
        <CardBody>
          <div className="space-y-3">
            {logs.map(log => (
              <div key={log._id} className={`flex items-start gap-3 p-4 rounded-xl ${!log.isRead ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}>
                <div className="w-9 h-9 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center shrink-0"><Bell size={16} className="text-primary-500" /></div>
                <div className="flex-1">
                  <p className="text-sm text-secondary dark:text-gray-200">{log.message}</p>
                  <p className="text-xs text-muted mt-0.5">{timeAgo(log.createdAt)}</p>
                </div>
                <Badge variant={typeColors[log.type] || 'gray'}>{log.type.replace('_', ' ')}</Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
