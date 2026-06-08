import { format, formatDistanceToNow, parseISO } from 'date-fns'

export const formatDate = (date: string | Date) => {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'MMM dd, yyyy')
}

export const formatDateTime = (date: string | Date) => {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'MMM dd, yyyy • h:mm a')
}

export const timeAgo = (date: string | Date) => {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export const formatWeek = (date: string | Date) => {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, "'Week' w, yyyy")
}
