import { useState, useEffect } from 'react'
import { Shield, Users, Bell, Settings } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { userService } from '../../services/userService'
import toast from 'react-hot-toast'

const mockUsers = [
  { _id: '1', name: 'Rahul Kumar', email: 'rahul@demo.com', role: 'intern', isActive: true },
  { _id: '2', name: 'Priya Manager', email: 'manager@demo.com', role: 'manager', isActive: true },
  { _id: '3', name: 'Admin User', email: 'admin@demo.com', role: 'admin', isActive: true },
]

const roleVariant: Record<string, any> = { intern: 'primary', manager: 'warning', admin: 'danger' }

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService.getAllUsers()
      .then(r => setUsers(r.data.data || r.data))
      .catch(() => setUsers(mockUsers))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary dark:text-white">User Management</h2>
          <p className="text-sm text-muted mt-1">{users.length} users registered</p>
        </div>
      </div>
      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border dark:border-gray-700">
                  <th className="text-left text-xs font-semibold text-muted uppercase px-4 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-muted uppercase px-4 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-muted uppercase px-4 py-3">Status</th>
                  <th className="text-right text-xs font-semibold text-muted uppercase px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-gray-700">
                {(loading ? mockUsers : users).map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-white text-sm font-bold">{user.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-semibold text-secondary dark:text-white">{user.name}</p>
                          <p className="text-xs text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant={roleVariant[user.role] || 'gray'}>{user.role}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={user.isActive ? 'success' : 'danger'}>{user.isActive ? 'Active' : 'Inactive'}</Badge></td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => toast.success('Role updated (demo)')}>Edit Role</Button>
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
