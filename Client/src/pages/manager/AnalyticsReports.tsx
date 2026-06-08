import { useEffect, useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { userService } from '../../services/userService'

export default function AnalyticsReports() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    userService.getAnalytics()
      .then(res => setData(res.data.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-container"><div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" /></div>
  if (!data) return null

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primaryText">Analytics Reports</h2>
          <p className="text-sm text-muted mt-1">Real-time team-wide performance metrics</p>
        </div>
        <Button variant="secondary" onClick={() => toast.success('CSV export coming soon!')}>
          <Download size={16} /> Export CSV
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Interns', value: data.totalInterns, suffix: '' },
          { label: 'Active Goals', value: data.activeGoals, suffix: '' },
          { label: 'Completed Goals', value: data.completedGoals, suffix: '' },
          { label: 'Pending Reviews', value: data.pendingReviews, suffix: '' },
        ].map(({ label, value, suffix }) => (
          <div key={label} className="stat-card">
            <p className="text-xs text-muted font-semibold uppercase mb-3">{label}</p>
            <p className="text-3xl font-black text-primaryText">{value}<span className="text-base text-muted font-medium">{suffix}</span></p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Goals vs Reports Trend</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend />
                <Bar dataKey="goals" fill="#2563EB" radius={[4,4,0,0]} name="Goals" />
                <Bar dataKey="reports" fill="#22C55E" radius={[4,4,0,0]} name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Goal Status Distribution</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={data.statusDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={5}>
                  {data.statusDistribution.map((entry: any, i: number) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
