import cron from 'node-cron';
import User from '../models/User.model.js';
import Goal from '../models/Goal.model.js';
import Report from '../models/Report.model.js';
import Notification from '../models/Notification.model.js';

/**
 * Helper — avoid duplicate notifications within the same day
 */
const alreadyNotifiedToday = async (recipient, type, context = '') => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const count = await Notification.countDocuments({
    recipient,
    type,
    message: { $regex: context, $options: 'i' },
    createdAt: { $gte: startOfDay },
  });
  return count > 0;
};

export const initCronJobs = () => {

  cron.schedule('0 17 * * 5', async () => {
    console.log('[CRON] Friday Report Reminder — running...');
    try {
      const pendingGoals = await Goal.find({
        status: { $in: ['Pending', 'In-Progress'] },
        deadline: { $gte: new Date() },
      }).populate('assignedTo', 'name');

      const uniqueInterns = new Map();
      for (const goal of pendingGoals) {
        for (const intern of goal.assignedTo) {
          if (!uniqueInterns.has(intern._id.toString())) {
            uniqueInterns.set(intern._id.toString(), {
              id: intern._id,
              name: intern.name,
              goals: [],
            });
          }
          uniqueInterns.get(intern._id.toString()).goals.push(goal.title);
        }
      }

      for (const [, intern] of uniqueInterns) {
        const alreadySent = await alreadyNotifiedToday(intern.id, 'reminder', 'Friday');
        if (!alreadySent) {
          const goalList = intern.goals.slice(0, 2).join(', ');
          const extra = intern.goals.length > 2 ? ` (+${intern.goals.length - 2} more)` : '';
          await Notification.create({
            recipient: intern.id,
            type: 'reminder',
            message: `📋 Friday Reminder: Submit your weekly report for "${goalList}"${extra} by end of day today!`,
          });
        }
      }
      console.log(`[CRON] Friday reminder sent to ${uniqueInterns.size} intern(s).`);
    } catch (err) {
      console.error('[CRON] Friday Reminder Error:', err.message);
    }
  });

  // ─────────────────────────────────────────────────────────────────
  // 2. EVERY MONDAY 9 AM — Remind managers to review pending reports
  // ─────────────────────────────────────────────────────────────────
  cron.schedule('0 9 * * 1', async () => {
    console.log('[CRON] Monday Review Reminder — running...');
    try {
      const managers = await User.find({ role: 'manager' });

      for (const manager of managers) {
        // Count how many reports are in their queue
        const managerGoals = await Goal.find({ createdBy: manager._id });
        const goalIds = managerGoals.map(g => g._id);
        const pendingReports = await Report.countDocuments({
          goal: { $in: goalIds },
          status: 'Submitted',
        });

        if (pendingReports > 0) {
          const alreadySent = await alreadyNotifiedToday(manager._id, 'reminder', 'Monday');
          if (!alreadySent) {
            await Notification.create({
              recipient: manager._id,
              type: 'reminder',
              message: `📊 Monday Briefing: You have ${pendingReports} report${pendingReports > 1 ? 's' : ''} waiting in your review queue.`,
            });
          }
        }
      }
      console.log(`[CRON] Monday reminder sent to ${managers.length} manager(s).`);
    } catch (err) {
      console.error('[CRON] Monday Reminder Error:', err.message);
    }
  });

  // ─────────────────────────────────────────────────────────────────
  // 3. EVERY HOUR — Send overdue task alerts (once per goal per day)
  // ─────────────────────────────────────────────────────────────────
  cron.schedule('0 * * * *', async () => {
    console.log('[CRON] Overdue Check — running...');
    try {
      const now = new Date();
      const overdueGoals = await Goal.find({
        deadline: { $lt: now },
        status: { $nin: ['Approved', 'Submitted'] },
      }).populate('assignedTo', 'name');

      let alertCount = 0;
      for (const goal of overdueGoals) {
        for (const intern of goal.assignedTo) {
          const alreadySent = await alreadyNotifiedToday(intern._id, 'reminder', goal.title);
          if (!alreadySent) {
            await Notification.create({
              recipient: intern._id,
              type: 'reminder',
              message: `🚨 OVERDUE: Your task "${goal.title}" was due ${goal.deadline.toLocaleDateString()}. Please submit your report immediately!`,
            });
            alertCount++;
          }
        }
      }
      console.log(`[CRON] Overdue alerts sent: ${alertCount}`);
    } catch (err) {
      console.error('[CRON] Overdue Check Error:', err.message);
    }
  });

  // ─────────────────────────────────────────────────────────────────
  // 4. EVERY SUNDAY 8 PM — Weekly performance digest for managers
  // ─────────────────────────────────────────────────────────────────
  cron.schedule('0 20 * * 0', async () => {
    console.log('[CRON] Weekly Digest — running...');
    try {
      const managers = await User.find({ role: 'manager' });

      for (const manager of managers) {
        const managerGoals = await Goal.find({ createdBy: manager._id });
        const goalIds = managerGoals.map(g => g._id);

        const [approvedThisWeek, pendingThisWeek, totalInterns] = await Promise.all([
          Report.countDocuments({ goal: { $in: goalIds }, status: 'Approved', reviewedAt: { $gte: new Date(Date.now() - 7 * 86400000) } }),
          Report.countDocuments({ goal: { $in: goalIds }, status: 'Submitted' }),
          User.countDocuments({ role: 'intern', manager: manager._id }),
        ]);

        await Notification.create({
          recipient: manager._id,
          type: 'reminder',
          message: `📈 Weekly Summary: ${approvedThisWeek} reports approved, ${pendingThisWeek} still pending review. Your team has ${managerGoals.length} active goals.`,
        });
      }
      console.log(`[CRON] Weekly digest sent to ${managers.length} manager(s).`);
    } catch (err) {
      console.error('[CRON] Weekly Digest Error:', err.message);
    }
  });

  // ─────────────────────────────────────────────────────────────────
  // 5. MIDWEEK CHECK — Wednesday noon, nudge interns with no progress
  // ─────────────────────────────────────────────────────────────────
  cron.schedule('0 12 * * 3', async () => {
    console.log('[CRON] Midweek Nudge — running...');
    try {
      const staleGoals = await Goal.find({
        status: 'Pending',
        deadline: { $gte: new Date() },
      }).populate('assignedTo', 'name');

      let nudgeCount = 0;
      for (const goal of staleGoals) {
        for (const intern of goal.assignedTo) {
          const alreadySent = await alreadyNotifiedToday(intern._id, 'reminder', 'Midweek');
          if (!alreadySent) {
            await Notification.create({
              recipient: intern._id,
              type: 'reminder',
              message: `⏰ Midweek Check-in: How's progress on "${goal.title}"? Make sure you're on track before Friday.`,
            });
            nudgeCount++;
          }
        }
      }
      console.log(`[CRON] Midweek nudges sent: ${nudgeCount}`);
    } catch (err) {
      console.error('[CRON] Midweek Nudge Error:', err.message);
    }
  });

  console.log('✅ All CRON jobs initialized (Friday, Monday, Hourly, Sunday digest, Wednesday nudge)');
};
