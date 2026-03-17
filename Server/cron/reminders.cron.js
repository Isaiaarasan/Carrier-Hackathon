import cron from 'node-cron';
import User from '../models/User.model.js';
import Goal from '../models/Goal.model.js';
import Notification from '../models/Notification.model.js';

// Every Friday at 6:00 PM - Notify interns with pending reports
export const initCronJobs = () => {
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
};
