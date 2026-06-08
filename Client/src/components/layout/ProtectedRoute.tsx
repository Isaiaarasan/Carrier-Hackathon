import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Mandatory flow: 1. Change Password
  if (user && !user.isPasswordChanged && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />
  }

  // Mandatory flow: 2. Onboarding
  if (
    user && 
    user.isPasswordChanged && 
    !user.isOnboarded && 
    location.pathname !== '/profile-setup'
  ) {
    return <Navigate to="/profile-setup" replace />
  }

  // Role check
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const dashboardHref = user.role === 'manager' ? '/manager/dashboard' : user.role === 'admin' ? '/admin/users' : '/intern/dashboard'
    return <Navigate to={dashboardHref} replace />
  }

  return <>{children}</>
}
