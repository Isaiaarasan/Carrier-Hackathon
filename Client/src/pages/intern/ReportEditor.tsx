import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FileText, ArrowLeft, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { goalService } from '../../services/goalService'
import { reportService } from '../../services/reportService'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
}
const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'blockquote', 'code-block', 'link']

export default function ReportEditor() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [goals, setGoals] = useState<any[]>([])
  const [selectedGoal, setSelectedGoal] = useState(searchParams.get('goalId') || '')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const wordCount = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length

  useEffect(() => {
    goalService.getMyGoals()
      .then(res => setGoals(res.data.data || res.data))
      .catch(() => setGoals([
        { _id: '1', title: 'Build REST API with Express', status: 'In-Progress' },
        { _id: '2', title: 'React Component Library', status: 'In-Progress' },
      ]))
  }, [])

  const handleSubmit = async () => {
    if (!selectedGoal) { toast.error('Please select a goal'); return }
    if (wordCount < 10) { toast.error('Please write at least 10 words in your report'); return }
    setLoading(true)
    try {
      await reportService.submitReport({ goalId: selectedGoal, content })
      toast.success('Report submitted successfully! 🎉')
      navigate('/intern/reports/history')
    } catch {
      toast.error('Failed to submit report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container space-y-6 max-w-4xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-secondary dark:text-white">Submit Weekly Report</h2>
          <p className="text-sm text-muted mt-1">Share your progress, blockers, and learnings this week</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-4">
            {/* Goal selector */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-secondary dark:text-gray-200">Select Goal</label>
              <select
                value={selectedGoal}
                onChange={e => setSelectedGoal(e.target.value)}
                className="input-base"
              >
                <option value="">Choose a goal...</option>
                {goals
                  .filter(g => ['In-Progress', 'Revision-Required'].includes(g.status))
                  .map(g => (
                    <option key={g._id} value={g._id}>{g.title}</option>
                  ))}
              </select>
            </div>

            {/* Rich text editor */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-secondary dark:text-gray-200">Report Content</label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Write about what you accomplished this week, what challenges you faced, and what you plan to do next..."
              />
            </div>

            <Button onClick={handleSubmit} isLoading={loading} size="lg" className="w-full">
              <Send size={16} /> Submit Report
            </Button>
          </div>

          {/* Sidebar tips */}
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Writing Tips</CardTitle></CardHeader>
              <CardBody>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {[
                    '✅ What did you accomplish this week?',
                    '🚧 What blockers did you face?',
                    '📚 What did you learn?',
                    '🎯 What will you focus on next week?',
                    '💡 Any ideas or suggestions?',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">{tip}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader><CardTitle>Word Count</CardTitle></CardHeader>
              <CardBody>
                <div className="text-center">
                  <p className="text-4xl font-bold text-secondary dark:text-white">{wordCount}</p>
                  <p className="text-xs text-muted mt-1">words written</p>
                  <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (wordCount / 200) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted mt-1">Target: 200+ words</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
