import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { 
  login, 
  getMe, 
  changePassword, 
  onboard, 
  adminCreateUser 
} from '../controllers/auth.controller.js';
import { createGoal, getGoals, updateGoalStatus } from '../controllers/goals.controller.js';
import { submitReport, getReviewQueue, reviewReport } from '../controllers/reports.controller.js';
import User from '../models/User.model.js';
import Notification from '../models/Notification.model.js';

const router = express.Router();

// Auth Routes
router.post('/auth/login', login);
router.get('/auth/me', protect, getMe);
router.put('/auth/change-password', protect, changePassword);
router.put('/auth/onboard', protect, onboard);

// Admin Only - Create User
router.post('/auth/create-user', protect, authorize('admin'), adminCreateUser);

// Goal Routes
router.post('/goals', protect, authorize('manager', 'admin'), createGoal);
router.get('/goals', protect, getGoals);
router.patch('/goals/:id/status', protect, updateGoalStatus);

// Report Routes
router.post('/reports', protect, authorize('intern'), submitReport);
router.get('/reports/queue', protect, authorize('manager', 'admin'), getReviewQueue);
router.patch('/reports/:id/review', protect, authorize('manager', 'admin'), reviewReport);

// User Routes
router.get('/users/interns', protect, authorize('manager', 'admin'), async (req, res) => {
  const interns = await User.find({ role: 'intern' });
  res.status(200).json({ success: true, data: interns });
});

router.get('/users', protect, authorize('admin'), async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
});

// Notification Routes
router.get('/notifications', protect, async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id }).sort('-createdAt');
  res.status(200).json({ success: true, data: notifications });
});

router.patch('/notifications/read', protect, async (req, res) => {
  await Notification.updateMany({ recipient: req.user.id }, { isRead: true });
  res.status(200).json({ success: true });
});

export default router;
