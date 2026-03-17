import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import api from '../../services/api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateUser } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) return toast.error('Passwords do not match')
    if (password.length < 6) return toast.error('Password must be at least 6 characters')

    setLoading(true)
    try {
      await api.put('/auth/change-password', { newPassword: password })
      toast.success('Password changed successfully!')
      updateUser({ isPasswordChanged: true })
      navigate('/profile-setup')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center shadow-glow">
            <Lock className="text-white" size={32} />
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Secure Your Account</CardTitle>
            <p className="text-sm text-muted mt-2">
              For your first login, please set a new personal password.
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefixIcon={<Lock size={18} />}
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                prefixIcon={<ShieldCheck size={18} />}
              />
              <Button 
                type="submit" 
                className="w-full mt-2" 
                isLoading={loading}
              >
                Update Password <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
          </CardBody>
        </Card>
        
        <p className="text-center text-xs text-muted mt-6">
          Setting a strong password helps keep your internship data safe.
        </p>
      </motion.div>
    </div>
  )
}
