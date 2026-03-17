import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, User as UserIcon, Mail, Building, Trash2, Shield, Lock } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import api from '../../services/api'
import toast from 'react-hot-toast'

interface User {
  _id: string
  name: string
  email: string
  role: string
  department?: string
  isActive: boolean
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'intern', department: '' })
  const [creating, setCreating] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      setUsers(res.data.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      await api.post('/auth/create-user', form)
      toast.success('User created! Initial password is their email.')
      setShowAdd(false)
      setForm({ name: '', email: '', role: 'intern', department: '' })
      fetchUsers()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create user')
    } finally {
      setCreating(false)
    }
  }

  const roleVariant: Record<string, any> = { intern: 'primary', manager: 'warning', admin: 'danger' }

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary dark:text-white">User Management</h2>
          <p className="text-sm text-muted mt-1">Admin control center for user accounts</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)}>
          <Plus size={18} className="mr-2" /> {showAdd ? 'Cancel' : 'Add New User'}
        </Button>
      </div>

      {showAdd && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-primary-200 dark:border-primary-900 shadow-glow-sm">
            <CardHeader><CardTitle>Create New Account</CardTitle></CardHeader>
            <CardBody>
              <form onSubmit={handleCreate} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  prefixIcon={<UserIcon size={18} />}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@company.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  prefixIcon={<Mail size={18} />}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Role</label>
                  <select
                    className="input-base"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="intern">Intern</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input
                      label="Department"
                      placeholder="e.g. Engineering"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      prefixIcon={<Building size={18} />}
                    />
                  </div>
                  <Button type="submit" isLoading={creating} className="h-[42px]">
                    Create
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      )}

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-4">User</th>
                  <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-4">Role</th>
                  <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-4">Department</th>
                  <th className="text-right text-xs font-semibold text-muted uppercase px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-secondary dark:text-white">{user.name}</p>
                          <p className="text-xs text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={roleVariant[user.role] || 'gray'}>{user.role}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {user.department || '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-danger hover:text-danger hover:bg-danger/10">
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
