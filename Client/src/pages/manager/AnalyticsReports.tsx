import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

const weeklyData = [
  { week: 'W1', goals: 8, reports: 6 }, { week: 'W2', goals: 14, reports: 12 },
  { week: 'W3', goals: 11, reports: 10 }, { week: 'W4', goals: 18, reports: 16 },
  { week: 'W5', goals: 15, reports: 14 }, { week: 'W6', goals: 20, reports: 18 },
]
const pieData = [
  { name: 'Approved', value: 34, color: '#22C55E' },
  { name: 'In-Progress', value: 28, color: '#2563EB' },
  { name: 'Pending', value: 18, color: '#F59E0B' },
  { name: 'Revision', value: 8, color: '#EF4444' },
]
const internPerf = [
  { name: 'Priya', score: 92 }, { name: 'Rahul', score: 85 },
  { name: 'Arjun', score: 78 }, { name: 'Meera', score: 72 }, { name: 'Kiran', score: 65 },
]

export default function AnalyticsReports() {
  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary dark:text-white">Analytics Reports</h2>
          <p className="text-sm text-muted mt-1">Team-wide performance metrics and trends</p>
        </div>
        <Button variant="secondary" onClick={() => toast.success('CSV export coming soon!')}>
          <Download size={16} /> Export CSV
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Score', value: '78.4', suffix: '/100' },
          { label: 'On-time Rate', value: '89', suffix: '%' },
          { label: 'Total Points', value: '2,340', suffix: '' },
          { label: 'Avg Goals/Week', value: '14.3', suffix: '' },
        ].map(({ label, value, suffix }) => (
          <div key={label} className="stat-card">
            <p className="text-xs text-muted font-semibold uppercase mb-3">{label}</p>
            <p className="text-3xl font-black text-secondary dark:text-white">{value}<span className="text-base text-muted font-medium">{suffix}</span></p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Goals vs Reports (Weekly)</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} />
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
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Intern Performance Ranking</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={internPerf} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" domain={[0,100]} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#94A3B8' }} width={50} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Bar dataKey="score" fill="#2563EB" radius={[0,6,6,0]} name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Weekly Submission Trend</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Line type="monotone" dataKey="reports" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 4 }} name="Reports" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
