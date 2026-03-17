import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, CheckCircle, Camera, Building } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import api from '../../services/api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'

export default function ProfileSetupPage() {
  const { user, updateUser } = useAuthStore()
  const [form, setForm] = useState({
    name: user?.name || '',
    department: user?.department || '',
    bio: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.department) return toast.error('Please specify your department')
    
    setLoading(true)
    try {
      const res = await api.put('/auth/onboard', {
        department: form.department,
        bio: form.bio,
        name: form.name
      })
      updateUser({ ...res.data.data, isOnboarded: true })
      toast.success('Onboarding complete!')
      
      const dashboardHref = user?.role === 'manager' ? '/manager/dashboard' : user?.role === 'admin' ? '/admin/users' : '/intern/dashboard'
      navigate(dashboardHref)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to complete onboarding')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-secondary dark:text-white mb-2">Welcome to InternPulse!</h1>
          <p className="text-muted">Let's finish setting up your profile.</p>
        </div>

        <form onSubmit={handleComplete}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card className="h-full">
                <CardBody className="flex flex-col items-center justify-center text-center p-6">
                  <div className="w-24 h-24 rounded-3xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 mb-4 border-2 border-dashed border-primary-300 dark:border-primary-700">
                    <Camera size={32} />
                  </div>
                  <p className="text-xs text-muted">Upload Avatar (Optional)</p>
                  <Button variant="ghost" size="sm" className="mt-4 w-full">Choose File</Button>
                </CardBody>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardBody className="space-y-4 pt-6">
                  <Input
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    prefixIcon={<User size={18} />}
                  />
                  <Input
                    label="Department / Team"
                    placeholder="e.g., Engineering, Marketing"
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    prefixIcon={<Building size={18} />}
                  />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-secondary dark:text-gray-200">Short Bio</label>
                    <textarea
                      className="input-base min-h-[100px] resize-none"
                      placeholder="Tell us a bit about yourself..."
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg" isLoading={loading}>
              Complete Setup <CheckCircle size={18} className="ml-2" />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
