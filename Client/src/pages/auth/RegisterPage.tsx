import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Building2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { authService } from '../../services/authService'

const roles = [
  { value: 'intern', label: '🎓 Intern', desc: 'Track your goals & submit reports' },
  { value: 'manager', label: '💼 Manager', desc: 'Manage interns and review reports' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'intern' | 'manager'>('intern')
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.register({ ...form, role: selectedRole })
      toast.success('Account created! Please sign in.')
      navigate('/login')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold">IP</span>
            </div>
            <span className="text-xl font-bold text-primaryText">InternPulse</span>
          </Link>
          <h1 className="text-2xl font-bold text-primaryText">Create your account</h1>
          <p className="text-muted text-sm mt-1">Join InternPulse in less than 2 minutes</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-border dark:border-gray-800 shadow-hover p-8">
          {/* Role selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-secondary dark:text-gray-200 mb-3">I am a...</p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedRole(value as 'intern' | 'manager')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-150 ${
                    selectedRole === value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-border dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <p className="font-semibold text-primaryText text-sm">{label}</p>
                  <p className="text-xs text-muted mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Rahul Sharma"
              prefixIcon={<User size={15} />}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              prefixIcon={<Mail size={15} />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Department"
              placeholder="Engineering / Design / Marketing"
              prefixIcon={<Building2 size={15} />}
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              prefixIcon={<Lock size={15} />}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <Button type="submit" className="w-full" isLoading={loading} size="lg">
              Create Account <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
