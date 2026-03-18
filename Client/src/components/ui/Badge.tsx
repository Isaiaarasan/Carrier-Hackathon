import { cn } from '../../utils/cn'

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'primary' | 'gray' | 'default'
  children: React.ReactNode
  className?: string
}

const variantMap: Record<string, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  gray: 'bg-gray-100 dark:bg-gray-700 text-secondary dark:text-gray-300',
  default: 'bg-gray-100 dark:bg-gray-700 text-secondary dark:text-gray-300',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', variantMap[variant], className)}>
      {children}
    </span>
  )
}

export function goalStatusBadge(status: string) {
  const map: Record<string, BadgeProps['variant']> = {
    'Pending': 'warning',
    'In-Progress': 'primary',
    'Submitted': 'gray',
    'Approved': 'success',
    'Revision-Required': 'danger',
  }
  return map[status] || 'default'
}
