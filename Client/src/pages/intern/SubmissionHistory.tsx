import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { reportService } from '../../services/reportService'
import { formatDateTime } from '../../utils/formatDate'

const statusIcon: Record<string, any> = {
  Submitted: Clock,
  Approved: CheckCircle,
  'Revision-Required': AlertCircle,
}
const statusVariant: Record<string, any> = {
  Submitted: 'gray',
  Approved: 'success',
  'Revision-Required': 'danger',
}

const mockReports = [
  { _id: '1', goal: { title: 'Build REST API' }, status: 'Approved', score: 88, submittedAt: new Date().toISOString() },
  { _id: '2', goal: { title: 'React Component Library' }, status: 'Submitted', score: null, submittedAt: new Date().toISOString() },
  { _id: '3', goal: { title: 'Database Design' }, status: 'Revision-Required', score: 52, submittedAt: new Date().toISOString() },
]

export default function SubmissionHistory() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    reportService.getMyReports()
      .then(res => setReports(res.data.data || res.data))
      .catch(() => setReports(mockReports))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary dark:text-white">Report History</h2>
        <p className="text-sm text-muted mt-1">{reports.length} reports submitted</p>
      </div>

      <div className="space-y-4">
        {loading
          ? Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            ))
          : reports.length === 0
          ? (
            <div className="text-center py-16 text-muted">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No reports submitted yet</p>
            </div>
          )
          : reports.map((report, i) => {
              const Icon = statusIcon[report.status] || FileText
              return (
                <motion.div key={report._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Link to={`/intern/reports/${report._id}/feedback`} className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 rounded-2xl hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200 group">
                    <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-secondary dark:text-white group-hover:text-primary-500 transition-colors">
                        {report.goal?.title || 'Report'}
                      </p>
                      <p className="text-xs text-muted mt-0.5">Submitted {formatDateTime(report.submittedAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {report.score != null && (
                        <span className="text-sm font-bold text-secondary dark:text-white">{report.score}/100</span>
                      )}
                      <Badge variant={statusVariant[report.status]}>{report.status}</Badge>
                      {report.status !== 'Submitted' && (
                        <span className="flex items-center gap-1 text-xs text-primary-500 font-medium">
                          <MessageSquare size={13} /> View Feedback
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
      </div>
    </div>
  )
}
