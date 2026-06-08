import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import ProtectedRoute from '../components/layout/ProtectedRoute'

// Auth Pages
import LandingPage from '../pages/auth/LandingPage'
import LoginPage from '../pages/auth/LoginPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import RoleSelectionPage from '../pages/auth/RoleSelectionPage'
import ProfileSetupPage from '../pages/auth/ProfileSetupPage'
import ChangePasswordPage from '../pages/auth/ChangePasswordPage'

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
import KanbanBoard from '../pages/common/KanbanBoard'
import CalendarView from '../pages/common/CalendarView'
import NotFoundPage from '../pages/common/NotFoundPage'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Mandatory Auth Flows */}
      <Route 
        path="/change-password" 
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile-setup" 
        element={
          <ProtectedRoute>
            <ProfileSetupPage />
          </ProtectedRoute>
        } 
      />

      {/* Intern Portal */}
      <Route path="/intern" element={<ProtectedRoute allowedRoles={['intern']}><AppLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<InternDashboard />} />
        <Route path="goals" element={<GoalsList />} />
        <Route path="goals/:id" element={<GoalDetail />} />
        <Route path="reports/new" element={<ReportEditor />} />
        <Route path="reports/history" element={<SubmissionHistory />} />
        <Route path="reports/:id/feedback" element={<FeedbackView />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>

      {/* Manager Portal */}
      <Route path="/manager" element={<ProtectedRoute allowedRoles={['manager']}><AppLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="interns" element={<InternList />} />
        <Route path="interns/:id" element={<InternProfile />} />
        <Route path="goals/create" element={<GoalWizard />} />
        <Route path="reviews" element={<ReviewQueue />} />
        <Route path="analytics" element={<AnalyticsReports />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AppLayout /></ProtectedRoute>}>
        <Route path="users" element={<UserManagement />} />
        <Route path="cohorts" element={<CohortCreation />} />
        <Route path="logs" element={<NotificationLogs />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      {/* Common / Shared Layout Routes */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="notifications" element={<NotificationsCenter />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpSupport />} />
        <Route path="kanban" element={<KanbanBoard />} />
        <Route path="calendar" element={<CalendarView />} />
      </Route>

      {/* Helper Redirects */}
      <Route path="/role-selection" element={<RoleSelectionPage />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
