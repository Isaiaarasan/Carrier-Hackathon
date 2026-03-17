import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, FileText, Trophy, Award } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { goalStatusBadge } from '../../components/ui/Badge'
import { userService } from '../../services/userService'
import { goalService } from '../../services/goalService'
import { formatDate } from '../../utils/formatDate'
import toast from 'react-hot-toast'

export default function InternProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [intern, setIntern] = useState<any>(null)
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    
    const fetchData = async () => {
      try {
        const [progressRes, goalsRes] = await Promise.all([
          userService.getInternProgress(id),
          goalService.getAllGoals()
        ])
        
        setIntern(progressRes.data.data)
        const allGoals = goalsRes.data.data || goalsRes.data || []
        setGoals(allGoals.filter((g: any) => g.assignedTo.some((acc: any) => (acc._id || acc) === id)))
      } catch (err) {
        toast.error('Failed to load intern profile')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [id])

  if (loading) return <div className="page-container"><div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" /></div>
  if (!intern) return <div className="page-container text-center py-20">Intern not found</div>

  const completionPct = intern.overallScore || 0

  return (
    <div className="page-container space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors">
        <ArrowLeft size={16} /> Back to Interns
      </button>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Card>
          <CardBody className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-lg">
                {intern?.name?.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-secondary dark:text-white">{intern?.name}</h2>
                <p className="text-sm text-muted">{intern?.email} • <span className="text-primary-500 font-semibold">{intern?.department || 'General'}</span></p>
                
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Goals Assigned', value: intern?.goalsAssigned || 0, icon: Target, color: 'text-primary-500' },
                    { label: 'Goals Completed', value: intern?.goalsCompleted || 0, icon: FileText, color: 'text-success' },
                    { label: 'Current Score', value: `${intern?.overallScore || 0}%`, icon: Trophy, color: 'text-warning' },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-border dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} className={color} />
                        <span className="text-[10px] text-muted font-bold uppercase tracking-wider">{label}</span>
                      </div>
                      <p className="text-2xl font-black text-secondary dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-auto text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="2.5" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray={`${completionPct}, 100`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-primary-600">{completionPct}%</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest">Progress</p>
                <Button size="sm" variant="ghost" className="mt-3 text-xs h-8">
                  <Award size={14} className="mr-1" /> Certify
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Goal History</CardTitle></CardHeader>
            <CardBody>
              <div className="space-y-3">
                {goals.length === 0 ? (
                  <div className="text-center py-10 text-muted italic">No goals found for this intern.</div>
                ) : (
                  goals.map((goal) => (
                    <div key={goal._id} className="flex items-center justify-between p-4 rounded-2xl border border-border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary-500">
                          <Target size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-secondary dark:text-white">{goal.title}</p>
                          <p className="text-[10px] text-muted mt-0.5 uppercase">{goal.points} points • Due {formatDate(goal.deadline)}</p>
                        </div>
                      </div>
                      <Badge variant={goalStatusBadge(goal.status)}>{goal.status}</Badge>
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>About Intern</CardTitle></CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-muted uppercase mb-1">Professional Bio</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                  {intern.bio || 'No bio provided.'}
                </p>
              </div>
              <div className="pt-4 border-t border-border dark:border-gray-800">
                <p className="text-[10px] font-bold text-muted uppercase mb-1">Contact Email</p>
                <p className="text-sm font-medium text-secondary dark:text-white">{intern.email}</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
