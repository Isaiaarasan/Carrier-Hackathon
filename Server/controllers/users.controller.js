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

    // Status distribution
    const statusDistribution = await Goal.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const formattedDistribution = statusDistribution.map(s => ({
      name: s._id,
      value: s.count,
      color: s._id === 'Approved' ? '#22C55E' : s._id === 'In-Progress' ? '#2563EB' : s._id === 'Pending' ? '#F59E0B' : '#EF4444'
    }));

    // Weekly stats (mocking the time series grouping logic but using count)
    const weeklyStats = [
      { week: 'W1', goals: 5, reports: 4 },
      { week: 'W2', goals: 8, reports: 7 },
      { week: 'W3', goals: activeGoals + completedGoals, reports: completedGoals }
    ];

    res.status(200).json({
      success: true,
      data: {
        totalInterns,
        activeGoals,
        pendingReviews,
        completedGoals,
        statusDistribution: formattedDistribution,
        weeklyStats
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
    const interns = await User.find({ role: 'intern' }).select('name department avatar');
    
    const leaderboard = await Promise.all(interns.map(async (intern) => {
      const approvedReports = await Report.countDocuments({ intern: intern._id, status: 'Approved' });
      const completedGoals = await Goal.countDocuments({ assignedTo: intern._id, status: 'Approved' });
      
      return {
        _id: intern._id,
        name: intern.name,
        department: intern.department,
        avatar: intern.avatar,
        score: approvedReports * 10 + completedGoals * 20,
        goalsCompleted: completedGoals,
        reportsApproved: approvedReports
      };
    }));

    const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);

    res.status(200).json({
      success: true,
      data: sortedLeaderboard
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get specific intern progress
// @route   GET /api/users/:id/progress
// @access  Private
export const getInternProgress = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const goals = await Goal.find({ assignedTo: userId });
    const approvedGoals = goals.filter(g => g.status === 'Approved').length;
    const reports = await Report.countDocuments({ intern: userId, status: 'Approved' });

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        goalsAssigned: goals.length,
        goalsCompleted: approvedGoals,
        overallScore: goals.length > 0 ? Math.round((approvedGoals / goals.length) * 100) : 0,
        activityHeatmap: [] // This would normally come from a more complex aggregation
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get interns
// @route   GET /api/users/interns
// @access  Private
export const getInterns = async (req, res) => {
  try {
    const interns = await User.find({ role: 'intern' });
    res.status(200).json({ success: true, data: interns });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
