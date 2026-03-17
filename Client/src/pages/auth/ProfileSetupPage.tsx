import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Building2, Camera } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuthStore } from '../../stores/authStore'
import { authService } from '../../services/authService'

export default function ProfileSetupPage() {
  const { user, updateUser } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', department: user?.department || '', bio: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      const res = await authService.updateProfile(fd)
      updateUser(res.data.user)
      toast.success('Profile updated!')
      const dash = user?.role === 'manager' ? '/manager/dashboard' : user?.role === 'admin' ? '/admin/users' : '/intern/dashboard'
      navigate(dash)
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Set up your profile</h1>
          <p className="text-sm text-muted mt-1">Help your team know who you are</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-border dark:border-gray-800 shadow-hover p-8">
          {/* Avatar placeholder */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                {form.name.charAt(0).toUpperCase() || 'U'}
              </div>
              <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-white dark:bg-gray-800 border border-border rounded-xl flex items-center justify-center text-muted hover:text-primary-500 transition-colors">
                <Camera size={13} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="Your full name" prefixIcon={<User size={15} />} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Department" placeholder="Engineering / Design / Marketing" prefixIcon={<Building2 size={15} />} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-secondary dark:text-gray-200">Short Bio</label>
              <textarea
                placeholder="Tell your team a bit about yourself..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="input-base resize-none"
              />
            </div>
            <Button type="submit" className="w-full" isLoading={loading} size="lg">Save & Go to Dashboard</Button>
          </form>
          <button onClick={() => navigate(user?.role === 'manager' ? '/manager/dashboard' : '/intern/dashboard')} className="w-full text-center text-sm text-muted hover:text-primary-500 transition-colors mt-3">
            Skip for now
          </button>
        </div>
      </motion.div>
    </div>
  )
}
