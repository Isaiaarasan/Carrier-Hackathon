import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from '../stores/themeStore'

// Layout
import AppLayout from '../components/layout/AppLayout'
import ProtectedRoute from '../components/layout/ProtectedRoute'

// Auth Pages
import LandingPage from '../pages/auth/LandingPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import RoleSelectionPage from '../pages/auth/RoleSelectionPage'
import ProfileSetupPage from '../pages/auth/ProfileSetupPage'

// Intern Pages
import InternDashboard from '../pages/intern/InternDashboard'
import GoalsList from '../pages/intern/GoalsList'
import GoalDetail from '../pages/intern/GoalDetail'
import ReportEditor from '../pages/intern/ReportEditor'
import SubmissionHistory from '../pages/intern/SubmissionHistory'
import FeedbackView from '../pages/intern/FeedbackView'
import Leaderboard from '../pages/intern/Leaderboard'

// Manager Pages
import ManagerDashboard from '../pages/manager/ManagerDashboard'
import InternList from '../pages/manager/InternList'
import InternProfile from '../pages/manager/InternProfile'
import GoalWizard from '../pages/manager/GoalWizard'
import ReviewQueue from '../pages/manager/ReviewQueue'
import AnalyticsReports from '../pages/manager/AnalyticsReports'

// Admin Pages
import UserManagement from '../pages/admin/UserManagement'
import CohortCreation from '../pages/admin/CohortCreation'
import NotificationLogs from '../pages/admin/NotificationLogs'
import SystemSettings from '../pages/admin/SystemSettings'

// Common Pages
import NotificationsCenter from '../pages/common/NotificationsCenter'
import SettingsPage from '../pages/common/SettingsPage'
import HelpSupport from '../pages/common/HelpSupport'
import NotFoundPage from '../pages/common/NotFoundPage'
import KanbanBoard from '../pages/common/KanbanBoard'
import CalendarView from '../pages/common/CalendarView'

export default function AppRouter() {
  const { isDark } = useThemeStore()

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [isDark])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/role-select" element={<RoleSelectionPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />

        {/* Intern Routes */}
        <Route element={<ProtectedRoute allowedRoles={['intern']} />}>
          <Route element={<AppLayout />}>
            <Route path="/intern/dashboard" element={<InternDashboard />} />
            <Route path="/intern/goals" element={<GoalsList />} />
            <Route path="/intern/goals/:id" element={<GoalDetail />} />
            <Route path="/intern/reports/new" element={<ReportEditor />} />
            <Route path="/intern/reports/history" element={<SubmissionHistory />} />
            <Route path="/intern/reports/:id/feedback" element={<FeedbackView />} />
            <Route path="/intern/leaderboard" element={<Leaderboard />} />
          </Route>
        </Route>

        {/* Manager Routes */}
        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route element={<AppLayout />}>
            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            <Route path="/manager/interns" element={<InternList />} />
            <Route path="/manager/interns/:id" element={<InternProfile />} />
            <Route path="/manager/goals/create" element={<GoalWizard />} />
            <Route path="/manager/reviews" element={<ReviewQueue />} />
            <Route path="/manager/analytics" element={<AnalyticsReports />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AppLayout />}>
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/cohorts" element={<CohortCreation />} />
            <Route path="/admin/notification-logs" element={<NotificationLogs />} />
            <Route path="/admin/settings" element={<SystemSettings />} />
          </Route>
        </Route>

        {/* Common Routes (any authenticated user) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/notifications" element={<NotificationsCenter />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpSupport />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
