import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Sparkles, Star, CheckCircle, RefreshCcw, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { reportService } from '../../services/reportService'
import { formatDateTime } from '../../utils/formatDate'

const mockReports = [
  { _id: '1', intern: { name: 'Rahul Kumar' }, goal: { title: 'Build REST API', points: 50 }, status: 'Submitted', submittedAt: new Date().toISOString(), content: '<p>Completed JWT authentication and RBAC middleware. The API now supports role-based access control with proper error handling.</p>' },
  { _id: '2', intern: { name: 'Priya Sharma' }, goal: { title: 'React Component Library', points: 40 }, status: 'Submitted', submittedAt: new Date().toISOString(), content: '<p>Built 12 reusable components including Button, Card, Modal, and Form components using TypeScript and Tailwind CSS.</p>' },
  { _id: '3', intern: { name: 'Arjun Nair' }, goal: { title: 'Database Design', points: 30 }, status: 'Submitted', submittedAt: new Date().toISOString(), content: '<p>Designed MongoDB schemas for all entities. Implemented indexing for performance optimization.</p>' },
]

export default function ReviewQueue() {
  const [reports, setReports] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [score, setScore] = useState(80)
  const [feedback, setFeedback] = useState('')
  const [aiSummary, setAiSummary] = useState('')
  const [summarizing, setSummarizing] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    reportService.getReviewQueue()
      .then(r => setReports(r.data.data || r.data))
      .catch(() => setReports(mockReports))
      .finally(() => setLoading(false))
  }, [])

  const handleSummarize = async () => {
    if (!selected) return
    setSummarizing(true)
    try {
      const res = await reportService.summarizeReport(selected._id)
      setAiSummary(res.data.summary || 'Intern completed the assigned task with notable quality in implementation and documentation.')
    } catch {
      setAiSummary('Intern completed the assigned task with notable quality in implementation and documentation.')
    } finally {
      setSummarizing(false)
    }
  }

  const handleReview = async (status: 'Approved' | 'Revision-Required') => {
    if (!selected) return
    setReviewing(true)
    try {
      await reportService.reviewReport(selected._id, { status, score, feedback })
      setReports(prev => prev.filter(r => r._id !== selected._id))
      setSelected(null)
      toast.success(`Report ${status === 'Approved' ? 'approved' : 'sent for revision'} successfully!`)
    } catch {
      toast.error('Failed to submit review')
    } finally {
      setReviewing(false)
    }
  }

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary dark:text-white">Review Queue</h2>
          <p className="text-sm text-muted mt-1">{reports.length} reports awaiting review</p>
        </div>
        {reports.length > 0 && (
          <Button variant="success" onClick={() => toast.success('Bulk approve not supported in demo')}>
            <CheckCircle size={16} /> Bulk Approve All
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Report list */}
        <div className="space-y-3">
          {loading
            ? Array(3).fill(0).map((_, i) => <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)
            : reports.length === 0
            ? (
              <div className="text-center py-16 text-muted">
                <CheckCircle size={40} className="mx-auto mb-3 text-success opacity-50" />
                <p className="font-medium">All caught up!</p>
                <p className="text-sm">No reports pending review.</p>
              </div>
            )
            : reports.map((report, i) => (
                <motion.div
                  key={report._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => { setSelected(report); setAiSummary(''); setFeedback(''); setScore(80) }}
                  className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 ${selected?._id === report._id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'bg-white dark:bg-gray-800 border-border dark:border-gray-700 hover:shadow-hover'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-secondary dark:text-white">{report.intern?.name}</span>
                    <Badge variant="gray"><Clock size={10} className="mr-1" />Pending</Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{report.goal?.title}</p>
                  <p className="text-xs text-muted mt-1">Submitted {formatDateTime(report.submittedAt)}</p>
                </motion.div>
              ))}
        </div>

        {/* Review panel */}
        <AnimatePresence>
          {selected ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Card>
                <CardHeader>
                  <CardTitle>{selected.intern?.name} — {selected.goal?.title}</CardTitle>
                  <span className="text-xs text-muted">{selected.goal?.points} pts</span>
                </CardHeader>
                <CardBody className="space-y-4">
                  {/* Report content */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-h-32 overflow-y-auto" dangerouslySetInnerHTML={{ __html: selected.content }} />

                  {/* AI Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-secondary dark:text-gray-200">AI Summary</span>
                      <Button variant="ghost" size="sm" onClick={handleSummarize} isLoading={summarizing}>
                        <Sparkles size={13} className="text-purple-500" /> Generate
                      </Button>
                    </div>
                    {aiSummary && (
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <p className="text-xs text-purple-700 dark:text-purple-300 italic">"{aiSummary}"</p>
                      </div>
                    )}
                  </div>

                  {/* Score */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-secondary dark:text-gray-200">Score: {score}/100</label>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= Math.round(score/20) ? 'text-warning fill-warning' : 'text-gray-300'} />)}
                      </div>
                    </div>
                    <input type="range" min="0" max="100" value={score} onChange={e => setScore(+e.target.value)} className="w-full accent-primary-500" />
                  </div>

                  {/* Feedback */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-secondary dark:text-gray-200">Feedback</label>
                    <textarea
                      placeholder="Provide constructive feedback for the intern..."
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      rows={3}
                      className="input-base resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1" onClick={() => handleReview('Approved')} isLoading={reviewing}>
                      <CheckCircle size={15} /> Approve
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => handleReview('Revision-Required')} disabled={reviewing}>
                      <RefreshCcw size={15} /> Request Revision
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ) : (
            <div className="hidden lg:flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border-2 border-dashed border-border dark:border-gray-700">
              <div className="text-center text-muted">
                <FileText size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a report to review</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
