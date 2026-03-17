import User from '../models/User.model.js';
import Goal from '../models/Goal.model.js';
import Report from '../models/Report.model.js';

// @desc    Get team analytics
// @route   GET /api/users/analytics
// @access  Private (Manager/Admin)
export const getAnalytics = async (req, res) => {
  try {
    const totalInterns = await User.countDocuments({ role: 'intern' });
    const activeGoals = await Goal.countDocuments({ status: { $in: ['Pending', 'In-Progress'] } });
    const pendingReviews = await Report.countDocuments({ status: 'Submitted' });
    const completedGoals = await Goal.countDocuments({ status: 'Approved' });

    res.status(200).json({
      success: true,
      data: {
        totalInterns,
        activeGoals,
        pendingReviews,
        completedGoals
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get intern leaderboard
// @route   GET /api/users/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
  try {
    // Basic scoring: Approved Reports * 10
    const reports = await Report.find({ status: 'Approved' }).populate('intern', 'name avatar department');
    
    const scores = {};
    reports.forEach(r => {
      const id = r.intern._id.toString();
      if (!scores[id]) {
        scores[id] = { 
          user: r.intern, 
          points: 0, 
          completed: 0 
        };
      }
      scores[id].points += 10;
      scores[id].completed += 1;
    });

    const leaderboard = Object.values(scores).sort((a, b) => b.points - a.points);

    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
