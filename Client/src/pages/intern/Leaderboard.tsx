import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Star } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { useAuthStore } from '../../stores/authStore'
import { userService } from '../../services/userService'

const mockLeaders = [
  { _id: '1', name: 'Priya Sharma', department: 'Engineering', score: 340, goalsCompleted: 12, reportsApproved: 11, avatar: null },
  { _id: '2', name: 'Rahul Kumar', department: 'Design', score: 290, goalsCompleted: 10, reportsApproved: 9, avatar: null },
  { _id: '3', name: 'Arjun Nair', department: 'Engineering', score: 255, goalsCompleted: 9, reportsApproved: 8, avatar: null },
  { _id: '4', name: 'Meera Patel', department: 'Marketing', score: 220, goalsCompleted: 8, reportsApproved: 7, avatar: null },
  { _id: '5', name: 'Kiran Reddy', department: 'Engineering', score: 185, goalsCompleted: 7, reportsApproved: 6, avatar: null },
]

const podiumColors = ['text-yellow-500', 'text-gray-400', 'text-amber-600']
const podiumBg = ['bg-yellow-50 dark:bg-yellow-900/20', 'bg-gray-50 dark:bg-gray-900/20', 'bg-amber-50 dark:bg-amber-900/20']

export default function Leaderboard() {
  const { user } = useAuthStore()
  const [leaders, setLeaders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'weekly' | 'alltime'>('alltime')

  useEffect(() => {
    userService.getLeaderboard()
      .then(res => setLeaders(res.data.data || res.data))
      .catch(() => setLeaders(mockLeaders))
      .finally(() => setLoading(false))
  }, [])

  const top3 = leaders.slice(0, 3)
  const rest = leaders.slice(3)

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary dark:text-white">Leaderboard 🏆</h2>
          <p className="text-sm text-muted mt-1">Rankings based on goals completed + reports approved</p>
        </div>
        <div className="flex gap-2">
          {(['weekly', 'alltime'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 border border-border dark:border-gray-700 text-muted'}`}>
              {t === 'weekly' ? 'This Week' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Podium - Top 3 */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {[top3[1], top3[0], top3[2]].map((leader, idx) => {
            const actualRank = leader === top3[0] ? 0 : leader === top3[1] ? 1 : 2
            return (
              <motion.div
                key={leader._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${podiumBg[actualRank]} rounded-2xl p-6 text-center border border-border dark:border-gray-700 ${actualRank === 0 ? 'order-2 -mx-2 z-10 shadow-hover' : actualRank === 1 ? 'order-1 mt-6' : 'order-3 mt-6'}`}
              >
                <div className="text-2xl mb-2">{['🥇','🥈','🥉'][actualRank]}</div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                  {leader.name.charAt(0)}
                </div>
                <p className={`font-bold text-sm ${podiumColors[actualRank]}`}>{leader.name}</p>
                <p className="text-xs text-muted">{leader.department}</p>
                <p className="text-xl font-black text-secondary dark:text-white mt-2">{leader.score}</p>
                <p className="text-xs text-muted">points</p>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Rest of the list */}
      <Card>
        <CardHeader><CardTitle>Full Rankings</CardTitle></CardHeader>
        <CardBody>
          <div className="space-y-2">
            {(leaders.length > 0 ? leaders : mockLeaders).map((leader, i) => {
              const isMe = leader._id === user?._id
              return (
                <motion.div
                  key={leader._id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${isMe ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                >
                  <span className={`w-8 text-center font-black text-base ${i < 3 ? podiumColors[i] : 'text-muted'}`}>
                    {i + 1}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                    {leader.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-secondary dark:text-white">{leader.name} {isMe && <span className="text-xs text-primary-500 ml-1">(You)</span>}</p>
                    <p className="text-xs text-muted">{leader.department} • {leader.goalsCompleted} goals • {leader.reportsApproved} reports</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-secondary dark:text-white">{leader.score}</p>
                    <p className="text-xs text-muted">pts</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
