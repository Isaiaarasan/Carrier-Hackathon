import { useState } from 'react'
import { Users, Plus, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

export default function CohortCreation() {
  const [cohorts, setCohorts] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', startDate: '', endDate: '' })
  const [loading, setLoading] = useState(false)

  const handleCreate = () => {
    if (!form.name) { toast.error('Please enter a cohort name'); return }
    if (!form.startDate || !form.endDate) { toast.error('Please select start and end dates'); return }
    
    setCohorts(prev => [...prev, { 
      _id: String(Date.now()), 
      name: form.name, 
      interns: 0, 
      manager: 'Unassigned', 
      startDate: form.startDate, 
      endDate: form.endDate 
    }])
    setForm({ name: '', startDate: '', endDate: '' })
    toast.success('Cohort created successfully!')
  }

  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-secondary dark:text-white">Cohorts & Batches</h2>
        <p className="text-sm text-muted mt-1">Organize interns into cohorts by program period</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Create New Cohort</CardTitle></CardHeader>
          <CardBody className="space-y-4">
            <Input label="Cohort Name" placeholder="e.g., Summer 2025 Batch" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Input label="Start Date" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            <Input label="End Date" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
            <Button className="w-full" onClick={handleCreate}><Plus size={16} /> Create Cohort</Button>
          </CardBody>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {cohorts.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No cohorts created yet</p>
              <p className="text-sm">Create your first cohort to get started</p>
            </div>
          ) : (
            cohorts.map(cohort => (
              <div key={cohort._id} className="p-5 bg-white dark:bg-gray-800 border border-border dark:border-gray-700 rounded-2xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-secondary dark:text-white">{cohort.name}</p>
                    <p className="text-xs text-muted">Managed by {cohort.manager}</p>
                  </div>
                  <Badge variant="primary">{cohort.interns} Interns</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {cohort.startDate} → {cohort.endDate}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
