import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Plus } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { goalStatusBadge } from '../../components/ui/Badge'
import toast from 'react-hot-toast'

const COLUMNS = [
  { id: 'Pending', label: 'Pending', color: 'bg-warning/10 text-warning' },
  { id: 'In-Progress', label: 'In Progress', color: 'bg-primary-500/10 text-primary-600 dark:text-primary-400' },
  { id: 'Submitted', label: 'Submitted', color: 'bg-gray-100 dark:bg-gray-700 text-muted' },
  { id: 'Approved', label: 'Approved', color: 'bg-success/10 text-success' },
]

const initGoals: any[] = [
  { _id: '1', title: 'Build REST API', points: 50, status: 'Approved' },
  { _id: '2', title: 'React Component Library', points: 40, status: 'In-Progress' },
  { _id: '3', title: 'Database Design', points: 30, status: 'Pending' },
  { _id: '4', title: 'UI Wireframes', points: 25, status: 'Submitted' },
  { _id: '5', title: 'Performance Testing', points: 35, status: 'In-Progress' },
]

export default function KanbanBoard() {
  const [goals, setGoals] = useState(initGoals)
  const [dragging, setDragging] = useState<string | null>(null)

  const handleDragStart = (id: string) => setDragging(id)

  const handleDrop = (colId: string) => {
    if (!dragging) return
    setGoals(prev => prev.map(g => g._id === dragging ? { ...g, status: colId } : g))
    setDragging(null)
    toast.success(`Goal moved to ${colId}`)
  }

  return (
    <div className="page-container h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-secondary dark:text-white">Kanban Board</h2>
        <p className="text-sm text-muted mt-1">Drag and drop goals across stages</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
        {COLUMNS.map(col => {
          const colGoals = goals.filter(g => g.status === col.id)
          return (
            <div
              key={col.id}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
              className="flex flex-col gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-border dark:border-gray-700 min-h-[400px]"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${col.color}`}>{col.label}</span>
                <span className="text-xs text-muted font-semibold">{colGoals.length}</span>
              </div>
              {colGoals.map((goal, i) => (
                <motion.div
                  key={goal._id}
                  layout
                  draggable
                  onDragStart={() => handleDragStart(goal._id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border dark:border-gray-700 cursor-grab active:cursor-grabbing hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Target size={14} className="text-primary-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-medium text-secondary dark:text-white leading-snug">{goal.title}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{goal.points} pts</span>
                    <Badge variant={goalStatusBadge(goal.status)} className="text-[10px]">{goal.status}</Badge>
                  </div>
                </motion.div>
              ))}
              {colGoals.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xs text-muted text-center">Drop goals here</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
