import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Target, FileText, Trophy, TrendingUp, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { StatCardSkeleton } from '../../components/ui/Skeleton'
import { goalService } from '../../services/goalService'
import { reportService } from '../../services/reportService'
import { userService } from '../../services/userService'
import { formatDate } from '../../utils/formatDate'
import { goalStatusBadge } from '../../components/ui/Badge'

const barData = [
  { week: 'W1', completed: 2 }, { week: 'W2', completed: 4 },
  { week: 'W3', completed: 3 }, { week: 'W4', completed: 5 },
  { week: 'W5', completed: 4 }, { week: 'W6', completed: 6 },
]
const lineData = [
  { week: 'W1', reports: 1 }, { week: 'W2', reports: 2 },
  { week: 'W3', reports: 1 }, { week: 'W4', reports: 2 },
  { week: 'W5', reports: 3 }, { week: 'W6', reports: 2 },
]

interface Stats {
  goalsAssigned: number
  goalsCompleted: number
  pendingReports: number
  overallScore: number
}

export default function InternDashboard() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [goals, setGoals] = useState<any[]>([])
  const [stats, setStats] = useState<Stats>({ goalsAssigned: 0, goalsCompleted: 0, pendingReports: 0, overallScore: 0 })

  useEffect(() => {
    const init = async () => {
      try {
        const [goalsRes, progressRes] = await Promise.all([
          goalService.getMyGoals(),
          userService.getInternProgress(user!._id),
        ])
        const g: any[] = goalsRes.data.data || goalsRes.data
        setGoals(g.slice(0, 5))
        const p = progressRes.data.data || progressRes.data
        setStats({
          goalsAssigned: p.goalsAssigned || g.length,
          goalsCompleted: p.goalsCompleted || g.filter((x: any) => x.status === 'Approved').length,
          pendingReports: p.pendingReports || 0,
          overallScore: p.overallScore || 0,
        })
      } catch {
        // Use mock data on backend failure
        setStats({ goalsAssigned: 8, goalsCompleted: 5, pendingReports: 2, overallScore: 74 })
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [user])

  const statCards = [
    { label: 'Goals Assigned', value: stats.goalsAssigned, icon: Target, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/20' },
    { label: 'Goals Completed', value: stats.goalsCompleted, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Pending Submissions', value: stats.pendingReports, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Overall Score', value: `${stats.overallScore}%`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ]

  return (
    <div className="page-container space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-secondary dark:text-white">
          Good morning, {user?.name?.split(' ')[0]} 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Here's an overview of your internship progress
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map(({ label, value, icon: Icon, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="stat-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-muted uppercase">{label}</p>
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon size={18} className={color} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-secondary dark:text-white">{value}</p>
              </motion.div>
            ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Weekly Productivity</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="completed" fill="#2563EB" radius={[6, 6, 0, 0]} name="Goals Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Report Submission Trend</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="reports" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 4 }} name="Reports" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Recent Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Goals</CardTitle>
          <Link to="/intern/goals" className="text-xs text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </CardHeader>
        <CardBody>
          {goals.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <Target size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No goals assigned yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {goals.map((goal) => (
                <Link
                  key={goal._id}
                  to={`/intern/goals/${goal._id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-secondary dark:text-white group-hover:text-primary-500 transition-colors">{goal.title}</p>
                    <p className="text-xs text-muted mt-0.5">Due {formatDate(goal.deadline)}</p>
                  </div>
                  <Badge variant={goalStatusBadge(goal.status)}>{goal.status}</Badge>
                </Link>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/intern/reports/new" className="flex items-center gap-3 p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl transition-all hover:shadow-glow">
          <FileText size={20} />
          <span className="font-semibold text-sm">Submit Weekly Report</span>
        </Link>
        <Link to="/intern/goals" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 hover:shadow-hover text-secondary dark:text-white rounded-2xl transition-all">
          <Target size={20} className="text-primary-500" />
          <span className="font-semibold text-sm">View My Goals</span>
        </Link>
        <Link to="/intern/leaderboard" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 hover:shadow-hover text-secondary dark:text-white rounded-2xl transition-all">
          <Trophy size={20} className="text-warning" />
          <span className="font-semibold text-sm">Leaderboard</span>
        </Link>
      </div>
    </div>
  )
}
