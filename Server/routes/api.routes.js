import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { 
  login, 
  getMe, 
  changePassword, 
  onboard, 
  adminCreateUser 
} from '../controllers/auth.controller.js';
import { getAnalytics, getLeaderboard, getInterns, getInternProgress } from '../controllers/users.controller.js';
import { createGoal, getGoals, updateGoalStatus } from '../controllers/goals.controller.js';
import { submitReport, getMyReports, getReviewQueue, reviewReport, summarizeReport } from '../controllers/reports.controller.js';
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
router.get('/reports/mine', protect, authorize('intern'), getMyReports);
router.get('/reports/queue', protect, authorize('manager', 'admin'), getReviewQueue);
router.patch('/reports/:id/review', protect, authorize('manager', 'admin'), reviewReport);
router.post('/reports/:id/summarize', protect, authorize('manager', 'admin'), summarizeReport);

// User Routes
router.get('/users/interns', protect, authorize('manager', 'admin'), getInterns);

router.get('/users', protect, authorize('admin'), async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
});
router.get('/users/analytics', protect, authorize('manager', 'admin'), getAnalytics);
router.get('/users/leaderboard', protect, getLeaderboard);
router.get('/users/:id/progress', protect, getInternProgress);

// Notification Routes
router.get('/notifications', protect, async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id })
    .sort('-createdAt')
    .limit(50);
  res.status(200).json({ success: true, data: notifications });
});

router.patch('/notifications/read', protect, async (req, res) => {
  await Notification.updateMany({ recipient: req.user.id }, { isRead: true });
  res.status(200).json({ success: true });
});

router.delete('/notifications/:id', protect, async (req, res) => {
  await Notification.findOneAndDelete({ _id: req.params.id, recipient: req.user.id });
  res.status(200).json({ success: true });
});

// Admin: Manual trigger for CRON jobs (useful for testing)
router.post('/admin/trigger-cron', protect, authorize('admin'), async (req, res) => {
  try {
    const { type } = req.body; // 'friday' | 'monday' | 'overdue' | 'digest'
    const Goal = (await import('../models/Goal.model.js')).default;
    const Report = (await import('../models/Report.model.js')).default;
    const User = (await import('../models/User.model.js')).default;

    let count = 0;
    const now = new Date();

    if (type === 'overdue') {
      const overdueGoals = await Goal.find({
        deadline: { $lt: now },
        status: { $nin: ['Approved', 'Submitted'] },
      });
      for (const goal of overdueGoals) {
        for (const internId of goal.assignedTo) {
          await Notification.create({
            recipient: internId,
            type: 'reminder',
            message: `🚨 OVERDUE: Your task "${goal.title}" is past its deadline. Please submit immediately!`,
          });
          count++;
        }
      }
    } else if (type === 'friday') {
      const interns = await User.find({ role: 'intern' });
      for (const intern of interns) {
        await Notification.create({
          recipient: intern._id,
          type: 'reminder',
          message: `📋 Test Reminder: This is a Friday report submission reminder. Please submit your weekly progress!`,
        });
        count++;
      }
    } else if (type === 'monday') {
      const managers = await User.find({ role: 'manager' });
      for (const manager of managers) {
        const goals = await Goal.find({ createdBy: manager._id });
        const goalIds = goals.map(g => g._id);
        const pending = await Report.countDocuments({ goal: { $in: goalIds }, status: 'Submitted' });
        await Notification.create({
          recipient: manager._id,
          type: 'reminder',
          message: `📊 Test Briefing: You have ${pending} report(s) in your review queue right now.`,
        });
        count++;
      }
    }

    res.status(200).json({ success: true, message: `CRON "${type}" triggered. ${count} notification(s) sent.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
