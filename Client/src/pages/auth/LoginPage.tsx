import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuthStore } from '../../stores/authStore'
import { authService } from '../../services/authService'

const orbs = [
  { size: 400, x: '-10%', y: '-20%', color: 'rgba(124,58,237,0.15)' },
  { size: 300, x: '80%', y: '60%',  color: 'rgba(79,70,229,0.12)' },
  { size: 200, x: '60%', y: '-10%', color: 'rgba(6,214,160,0.08)' },
]

const demoAccounts = {
  manager: { email: 'manager@internpulse.com', password: 'manager123' },
  intern:  { email: 'intern@internpulse.com',  password: 'intern123' },
  admin:   { email: 'admin@internpulse.com',   password: 'admin123' },
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { setAuth, isAuthenticated, user } = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboard =
        user.role === 'manager' ? '/manager/dashboard' :
        user.role === 'admin'   ? '/admin/users' :
        '/intern/dashboard'
      navigate(dashboard)
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.login(form.email, form.password)
      const { user, token } = res.data
      setAuth(user, token)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}! 👋`)
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden auth-bg">

      {/* Background orbs */}
      {orbs.map((orb, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{
            width: orb.size, height: orb.size,
            left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(1px)',
          }} />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(124,58,237,0.4)', '0 0 40px rgba(124,58,237,0.7)', '0 0 20px rgba(124,58,237,0.4)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }}>
              <Zap size={26} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">InternPulse</h1>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(167,139,250,0.6)' }}>
                Smart Internship Management
              </p>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl p-8" style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
        }}>

          {/* Quick Demo Login */}
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center"
              style={{ color: 'rgba(167,139,250,0.5)' }}>
              Quick Demo Access
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(['admin', 'manager', 'intern'] as const).map((role) => (
                <button key={role}
                  type="button"
                  onClick={() => setForm(demoAccounts[role])}
                  className="py-2.5 px-3 rounded-2xl text-xs font-semibold capitalize transition-all duration-200"
                  style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(124,58,237,0.18)',
                    color: 'rgba(167,139,250,0.8)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(124,58,237,0.2)'
                    el.style.borderColor = 'rgba(124,58,237,0.5)'
                    el.style.color = '#C4B5FD'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(124,58,237,0.08)'
                    el.style.borderColor = 'rgba(124,58,237,0.18)'
                    el.style.color = 'rgba(167,139,250,0.8)'
                  }}>
                  <Sparkles size={10} className="inline mr-1" />
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(124,58,237,0.15)' }} />
            <span className="text-[10px] uppercase tracking-widest"
              style={{ color: 'rgba(248,248,255,0.2)' }}>or continue</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(124,58,237,0.15)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              prefixIcon={<Mail size={15} />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'rgba(167,139,250,0.7)' }}>
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(124,58,237,0.6)' }}>
                  <Lock size={15} />
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-base pl-11 pr-11"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(248,248,255,0.3)' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full !h-12 text-base" isLoading={loading}>
              Sign In <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center mt-6 text-xs" style={{ color: 'rgba(248,248,255,0.25)' }}>
            🔒 Protected by enterprise-grade encryption
          </p>
        </div>
      </motion.div>
    </div>
  )
}
