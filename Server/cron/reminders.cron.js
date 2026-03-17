import cron from 'node-cron';
import User from '../models/User.model.js';
import Goal from '../models/Goal.model.js';
import Notification from '../models/Notification.model.js';

export const initCronJobs = () => {
  // Every Friday at 6:00 PM - Notify interns with pending reports
  cron.schedule('0 18 * * 5', async () => {
    console.log('Running Friday Reminder Cron...');
    try {
      const activeGoals = await Goal.find({ status: { $in: ['Pending', 'In-Progress'] } });
      const internIds = [...new Set(activeGoals.flatMap(g => g.assignedTo.map(id => id.toString())))];

      for (const id of internIds) {
        await Notification.create({
          recipient: id,
          type: 'reminder',
          message: 'Friday Reminder: Please submit your weekly report by 6:00 PM today.',
        });
      }
    } catch (err) {
      console.error('Friday Cron Error:', err);
    }
  });

  // Every Monday at 9:00 AM - Notify managers to review reports
  cron.schedule('0 9 * * 1', async () => {
    console.log('Running Monday Review Cron...');
    try {
      const managers = await User.find({ role: 'manager' });
      for (const manager of managers) {
        await Notification.create({
          recipient: manager._id,
          type: 'reminder',
          message: 'Monday Briefing: You have pending reports in your review queue.',
        });
      }
    } catch (err) {
      console.error('Monday Cron Error:', err);
    }
  });

  // Check for Overdue Tasks - Every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Running Overdue Task Check Cron...');
    try {
      const now = new Date();
      const overdueGoals = await Goal.find({
        deadline: { $lt: now },
        status: { $nin: ['Approved', 'Submitted'] }
      });

      for (const goal of overdueGoals) {
        // Send notification to each assigned intern if not already notified for overdue
        // For simplicity in hackathon, just send it once an hour if it's still overdue
        for (const internId of goal.assignedTo) {
          await Notification.create({
            recipient: internId,
            type: 'reminder',
            message: `URGENT: Your task "${goal.title}" is overdue! Please complete it immediately.`,
          });
        }
      }
    } catch (err) {
      console.error('Overdue Cron Error:', err);
    }
  });
};
