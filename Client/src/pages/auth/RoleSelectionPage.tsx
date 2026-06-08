import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const roles = [
  { value: 'intern', icon: GraduationCap, label: 'Intern', desc: 'I want to track my goals and submit weekly reports', color: 'from-blue-400 to-primary-500', dash: '/intern/dashboard' },
  { value: 'manager', icon: Briefcase, label: 'Manager', desc: 'I want to manage interns and review their progress', color: 'from-purple-400 to-purple-600', dash: '/manager/dashboard' },
  { value: 'admin', icon: ShieldCheck, label: 'Admin', desc: 'I want full control over the platform settings', color: 'from-gray-400 to-gray-600', dash: '/admin/users' },
]

export default function RoleSelectionPage() {
  const { user, updateUser } = useAuthStore()
  const navigate = useNavigate()

  const handleSelect = (role: string, dash: string) => {
    updateUser({ role: role as any })
    navigate(dash)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl text-center">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-primaryText mb-2">Welcome, {user?.name}! 👋</h1>
          <p className="text-muted">Choose your role to get started with InternPulse</p>
        </div>
        <div className="space-y-4">
          {roles.map(({ value, icon: Icon, label, desc, color, dash }, i) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelect(value, dash)}
              className="w-full flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-gray-900 border-2 border-border dark:border-gray-800 hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-hover transition-all duration-200 group text-left"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                <Icon size={24} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-primaryText text-base">{label}</p>
                <p className="text-sm text-muted">{desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
