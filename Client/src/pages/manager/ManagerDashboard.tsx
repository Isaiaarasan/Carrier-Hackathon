import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Users, Target, FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { StatCardSkeleton } from '../../components/ui/Skeleton'
import { goalStatusBadge } from '../../components/ui/Badge'
import { userService } from '../../services/userService'
import { timeAgo } from '../../utils/formatDate'

const pieData = [
  { name: 'Approved', value: 34, color: '#22C55E' },
  { name: 'In-Progress', value: 28, color: '#2563EB' },
  { name: 'Pending', value: 18, color: '#F59E0B' },
  { name: 'Revision', value: 8,  color: '#EF4444' },
]
const barData = [
  { week: 'W1', goals: 8 }, { week: 'W2', goals: 14 },
  { week: 'W3', goals: 11 }, { week: 'W4', goals: 18 },
  { week: 'W5', goals: 15 }, { week: 'W6', goals: 20 },
]

const activities = [
  { text: 'Rahul submitted Weekly Report 6', time: '2 min ago', color: 'bg-primary-500' },
  { text: 'Priya completed "Build REST API" goal', time: '15 min ago', color: 'bg-success' },
  { text: 'Arjun needs revision on Report 5', time: '1 hr ago', color: 'bg-warning' },
  { text: 'Meera approved by manager', time: '2 hrs ago', color: 'bg-purple-500' },
  { text: 'New intern Kiran joined the team', time: '1 day ago', color: 'bg-gray-400' },
]

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ interns: 0, activeGoals: 0, pendingReviews: 0, completedGoals: 0 })
  const [interns, setInterns] = useState<any[]>([])

  useEffect(() => {
    const init = async () => {
      try {
        const [internsRes, analyticsRes] = await Promise.all([
          userService.getInterns(),
          userService.getAnalytics(),
        ])
        setInterns((internsRes.data.data || internsRes.data).slice(0, 5))
        const a = analyticsRes.data.data || analyticsRes.data
        setStats({
          interns: a.totalInterns || 12,
          activeGoals: a.activeGoals || 20,
          pendingReviews: a.pendingReviews || 6,
          completedGoals: a.completedGoals || 34,
        })
      } catch {
        setStats({ interns: 12, activeGoals: 20, pendingReviews: 6, completedGoals: 34 })
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const statCards = [
    { label: 'Total Interns', value: stats.interns, icon: Users, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/20', to: '/manager/interns' },
    { label: 'Active Goals', value: stats.activeGoals, icon: Target, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', to: '/manager/goals/create' },
    { label: 'Pending Reviews', value: stats.pendingReviews, icon: Clock, color: 'text-warning', bg: 'bg-warning/10', to: '/manager/reviews' },
    { label: 'Goals Completed', value: stats.completedGoals, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', to: '/manager/analytics' },
  ]

  return (
    <div className="page-container space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map(({ label, value, icon: Icon, color, bg, to }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to={to} className="stat-card block group">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold text-muted uppercase">{label}</p>
                    <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                      <Icon size={18} className={color} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-secondary dark:text-white group-hover:text-primary-500 transition-colors">{value}</p>
                </Link>
              </motion.div>
            ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Team Weekly Progress</CardTitle></CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="goals" fill="#2563EB" radius={[6, 6, 0, 0]} name="Goals Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Goal Completion Rate</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Intern list */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Interns</CardTitle>
            <Link to="/manager/interns" className="text-xs text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {interns.length === 0
                ? [1,2,3,4].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border dark:border-gray-700">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">R</div>
                      <div><p className="text-sm font-medium text-secondary dark:text-white">Demo Intern {i}</p><p className="text-xs text-muted">Engineering</p></div>
                      <div className="ml-auto"><Badge variant="success">Active</Badge></div>
                    </div>
                  ))
                : interns.map((intern) => (
                    <Link key={intern._id} to={`/manager/interns/${intern._id}`} className="flex items-center gap-3 p-3 rounded-xl border border-border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                        {intern.name?.charAt(0)}
                      </div>
                      <div><p className="text-sm font-medium text-secondary dark:text-white">{intern.name}</p><p className="text-xs text-muted">{intern.department}</p></div>
                      <div className="ml-auto"><Badge variant="success">Active</Badge></div>
                    </Link>
                  ))}
            </div>
          </CardBody>
        </Card>

        {/* Activity feed */}
        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardBody>
            <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${a.color} mt-2 shrink-0`} />
                  <div>
                    <p className="text-sm text-secondary dark:text-gray-200">{a.text}</p>
                    <p className="text-xs text-muted mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/manager/goals/create" className="flex items-center gap-3 p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl transition-all hover:shadow-glow">
          <Target size={20} /> <span className="font-semibold text-sm">Create New Goal</span>
        </Link>
        <Link to="/manager/reviews" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 hover:shadow-hover text-secondary dark:text-white rounded-2xl transition-all">
          <FileText size={20} className="text-warning" /> <span className="font-semibold text-sm">Review Reports ({stats.pendingReviews})</span>
        </Link>
        <Link to="/manager/analytics" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 hover:shadow-hover text-secondary dark:text-white rounded-2xl transition-all">
          <Users size={20} className="text-primary-500" /> <span className="font-semibold text-sm">View Analytics</span>
        </Link>
      </div>
    </div>
  )
}
