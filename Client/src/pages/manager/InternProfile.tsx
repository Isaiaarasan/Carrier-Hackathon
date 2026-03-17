import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, FileText, Trophy, Award } from 'lucide-react'
import CalendarHeatmap from 'react-calendar-heatmap'
import type { ReactCalendarHeatmapValue } from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { goalStatusBadge } from '../../components/ui/Badge'
import { userService } from '../../services/userService'
import { formatDate } from '../../utils/formatDate'

const mockGoals = [
  { _id: '1', title: 'Build REST API', status: 'Approved', points: 50, deadline: new Date().toISOString() },
  { _id: '2', title: 'React Component Library', status: 'In-Progress', points: 40, deadline: new Date().toISOString() },
  { _id: '3', title: 'Database Design', status: 'Approved', points: 30, deadline: new Date().toISOString() },
]

const heatmapValues = Array.from({ length: 52 }, (_, i) => ({
  date: new Date(Date.now() - (51 - i) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  count: Math.floor(Math.random() * 4),
}))

export default function InternProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [intern, setIntern] = useState<any>(null)
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([userService.getInternById(id), userService.getInternProgress(id)])
      .then(([userRes, progressRes]) => {
        setIntern(progressRes.data.data || { ...userRes.data.data, goalsAssigned: mockGoals.length, goalsCompleted: 2, overallScore: 82 })
        setGoals(mockGoals)
      })
      .catch(() => {
        setIntern({ name: 'Demo Intern', email: 'intern@demo.com', department: 'Engineering', goalsAssigned: 3, goalsCompleted: 2, overallScore: 82 })
        setGoals(mockGoals)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="page-container"><div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" /></div>

  const completionPct = intern?.goalsAssigned > 0 ? Math.round((intern.goalsCompleted / intern.goalsAssigned) * 100) : 0

  return (
    <div className="page-container space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors">
        <ArrowLeft size={16} /> Back to Interns
      </button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Profile header */}
        <Card>
          <CardBody className="pt-6">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                {intern?.name?.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-secondary dark:text-white">{intern?.name}</h2>
                <p className="text-sm text-muted">{intern?.email} • {intern?.department}</p>
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Goals Assigned', value: intern?.goalsAssigned || 0, icon: Target },
                    { label: 'Goals Completed', value: intern?.goalsCompleted || 0, icon: FileText },
                    { label: 'Overall Score', value: `${intern?.overallScore || 0}%`, icon: Trophy },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <p className="text-xs text-muted">{label}</p>
                      <p className="text-xl font-bold text-secondary dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Certificate score */}
              <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray={`${completionPct}, 100`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-600">{completionPct}%</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-2">Cert. Score</p>
                <button className="mt-1 text-xs text-primary-500 hover:underline flex items-center gap-1 mx-auto">
                  <Award size={12} /> Download
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Heatmap */}
        <Card>
          <CardHeader><CardTitle>Activity Heatmap</CardTitle></CardHeader>
          <CardBody>
            <CalendarHeatmap
              startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
              endDate={new Date()}
              values={heatmapValues}
              classForValue={(value: ReactCalendarHeatmapValue<string> | undefined) => {
                const v = value as any
                if (!v || !v.count || v.count === 0) return 'color-empty'
                return `color-scale-${Math.min(v.count, 4)}`
              }}
            />
            <style>{`
              .react-calendar-heatmap rect { rx: 2; }
              .color-empty { fill: #E5E7EB; }
              .color-scale-1 { fill: #BFDBFE; }
              .color-scale-2 { fill: #60A5FA; }
              .color-scale-3 { fill: #2563EB; }
              .color-scale-4 { fill: #1E40AF; }
            `}</style>
          </CardBody>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader><CardTitle>Assigned Goals</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal._id} className="flex items-center justify-between p-4 rounded-xl border border-border dark:border-gray-700">
                  <div>
                    <p className="text-sm font-semibold text-secondary dark:text-white">{goal.title}</p>
                    <p className="text-xs text-muted">{goal.points} pts • Due {formatDate(goal.deadline)}</p>
                  </div>
                  <Badge variant={goalStatusBadge(goal.status)}>{goal.status}</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}
