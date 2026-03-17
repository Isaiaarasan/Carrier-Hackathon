import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

interface ProtectedRouteProps {
  allowedRoles?: ('intern' | 'manager' | 'admin')[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to the correct dashboard based on role
    const roleDashboard =
      user.role === 'manager' ? '/manager/dashboard' :
      user.role === 'admin'   ? '/admin/users' :
      '/intern/dashboard'
    return <Navigate to={roleDashboard} replace />
  }

  return <Outlet />
}
