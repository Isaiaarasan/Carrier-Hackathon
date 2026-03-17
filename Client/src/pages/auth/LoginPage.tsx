import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuthStore } from '../../stores/authStore'
import { authService } from '../../services/authService'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.login(form.email, form.password)
      const { user, token } = res.data
      login(user, token)
      toast.success(`Welcome back, ${user.name}!`)
      const dashboard =
        user.role === 'manager' ? '/manager/dashboard' :
        user.role === 'admin'   ? '/admin/users' :
        '/intern/dashboard'
      navigate(dashboard)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (role: 'manager' | 'intern' | 'admin') => {
    const demoAccounts = {
      manager: { email: 'manager@demo.com', password: 'demo123' },
      intern:  { email: 'intern@demo.com',  password: 'demo123' },
      admin:   { email: 'admin@demo.com',   password: 'demo123' },
    }
    setForm(demoAccounts[role])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold">IP</span>
            </div>
            <span className="text-xl font-bold text-secondary dark:text-white">InternPulse</span>
          </Link>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-border dark:border-gray-800 shadow-hover p-8">
          {/* Demo buttons */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted uppercase text-center mb-3">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              {(['manager', 'intern', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleDemoLogin(role)}
                  className="py-2 px-3 rounded-xl border border-border dark:border-gray-700 text-xs font-medium capitalize hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-border dark:border-gray-700" />
            <span className="text-xs text-muted">or sign in with email</span>
            <hr className="flex-1 border-border dark:border-gray-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              prefixIcon={<Mail size={15} />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-secondary dark:text-gray-200">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  <Lock size={15} />
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-base pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary dark:hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-primary-500 hover:text-primary-600 font-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" isLoading={loading} size="lg">
              Sign In <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-600 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
