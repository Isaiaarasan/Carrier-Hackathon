export const ROLES = {
  INTERN: 'intern',
  MANAGER: 'manager',
  ADMIN: 'admin',
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

export const GOAL_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In-Progress',
  SUBMITTED: 'Submitted',
  APPROVED: 'Approved',
  REVISION: 'Revision-Required',
} as const

export type GoalStatus = typeof GOAL_STATUS[keyof typeof GOAL_STATUS]

export const REPORT_STATUS = {
  SUBMITTED: 'Submitted',
  APPROVED: 'Approved',
  REVISION: 'Revision-Required',
} as const

export type ReportStatus = typeof REPORT_STATUS[keyof typeof REPORT_STATUS]

export const GOAL_STATUS_COLORS: Record<string, string> = {
  'Pending': 'badge-warning',
  'In-Progress': 'badge-primary',
  'Submitted': 'badge-gray',
  'Approved': 'badge-success',
  'Revision-Required': 'badge-danger',
}

export const REPORT_STATUS_COLORS: Record<string, string> = {
  'Submitted': 'badge-primary',
  'Approved': 'badge-success',
  'Revision-Required': 'badge-danger',
}

export const NOTIFICATION_TYPES = {
  GOAL_ASSIGNED: 'goal_assigned',
  REPORT_SUBMITTED: 'report_submitted',
  REPORT_APPROVED: 'report_approved',
  REPORT_REJECTED: 'report_rejected',
  REMINDER: 'reminder',
} as const

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Certificate Score = (goalsCompleted * 40 + reportsApproved * 40 + avgFeedbackScore * 20) / 100
 */
export const calculateCertificateScore = (
  goalsCompleted: number,
  totalGoals: number,
  reportsApproved: number,
  avgFeedback: number // 0-100
) => {
  const goalWeight = totalGoals > 0 ? (goalsCompleted / totalGoals) * 40 : 0
  const reportWeight = totalGoals > 0 ? (reportsApproved / totalGoals) * 40 : 0
  const feedbackWeight = (avgFeedback / 100) * 20
  
  return Math.min(Math.round(goalWeight + reportWeight + feedbackWeight), 100)
}
