import User from "../models/User.model.js";
import Goal from "../models/Goal.model.js";
import Report from "../models/Report.model.js";

// @desc    Get team analytics
// @route   GET /api/users/analytics
// @access  Private (Manager/Admin)
export const getAnalytics = async (req, res) => {
  try {
    const totalInterns = await User.countDocuments({ role: "intern" });
    const activeGoals = await Goal.countDocuments({
      status: { $in: ["Pending", "In-Progress"] },
    });
    const pendingReviews = await Report.countDocuments({ status: "Submitted" });
    const completedGoals = await Goal.countDocuments({ status: "Approved" });

    // Status distribution
    const statusDistribution = await Goal.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const formattedDistribution = statusDistribution.map((s) => ({
      name: s._id,
      value: s.count,
      color:
        s._id === "Approved"
          ? "#22C55E"
          : s._id === "In-Progress"
            ? "#2563EB"
            : s._id === "Pending"
              ? "#F59E0B"
              : "#EF4444",
    }));

    // Real weekly stats from database (last 4 weeks)
    const weeklyStats = [];
    for (let i = 3; i >= 0; i--) {
      const startOfWeek = new Date();
      startOfWeek.setDate(
        startOfWeek.getDate() - (startOfWeek.getDay() + 7 * i),
      );
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const [weekGoals, weekReports] = await Promise.all([
        Goal.countDocuments({
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        }),
        Report.countDocuments({
          submittedAt: { $gte: startOfWeek, $lte: endOfWeek },
        }),
      ]);

      const weekLabel = `W${Math.abs(i) + 1}`;
      weeklyStats.push({
        week: weekLabel,
        goals: weekGoals,
        reports: weekReports,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        totalInterns,
        activeGoals,
        pendingReviews,
        completedGoals,
        statusDistribution: formattedDistribution,
        weeklyStats,
      },
    });
  } catch (error) {
    console.error("[Analytics Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get intern leaderboard
// @route   GET /api/users/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
  try {
    const interns = await User.find({ role: "intern" }).select(
      "name department avatar",
    );

    const leaderboard = await Promise.all(
      interns.map(async (intern) => {
        const [approvedReports, completedGoals, totalGoals] = await Promise.all(
          [
            Report.countDocuments({ intern: intern._id, status: "Approved" }),
            Goal.countDocuments({ assignedTo: intern._id, status: "Approved" }),
            Goal.countDocuments({ assignedTo: intern._id }),
          ],
        );

        const successRate =
          totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

        return {
          _id: intern._id,
          name: intern.name,
          department: intern.department,
          avatar: intern.avatar,
          score: approvedReports * 10 + completedGoals * 20,
          goalsCompleted: completedGoals,
          goalsAssigned: totalGoals,
          reportsApproved: approvedReports,
          successRate,
          rank: 0, // Will be assigned after sorting
        };
      }),
    );

    // Sort by score and assign ranks
    const sortedLeaderboard = leaderboard
      .sort((a, b) => b.score - a.score)
      .map((leader, index) => ({ ...leader, rank: index + 1 }));

    res.status(200).json({
      success: true,
      data: sortedLeaderboard,
    });
  } catch (error) {
    console.error("[Leaderboard Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get specific intern progress
// @route   GET /api/users/:id/progress
// @access  Private
export const getInternProgress = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select(
      "name email department avatar",
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const [goals, approvedGoals, reports] = await Promise.all([
      Goal.find({ assignedTo: userId }),
      Goal.countDocuments({ assignedTo: userId, status: "Approved" }),
      Report.countDocuments({ intern: userId, status: "Approved" }),
    ]);

    const goalsAssigned = goals.length;
    const goalsCompleted = approvedGoals;
    const overallScore =
      goalsAssigned > 0
        ? Math.round((goalsCompleted / goalsAssigned) * 100)
        : 0;

    // Calculate activity over the last 7 days (simplified heatmap)
    const activityHeatmap = await Promise.all(
      Array.from({ length: 7 }).map(async (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);

        const count = await Report.countDocuments({
          intern: userId,
          submittedAt: { $gte: date, $lt: nextDate },
        });

        return {
          date: date.toISOString().split("T")[0],
          count,
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        avatar: user.avatar,
        goalsAssigned,
        goalsCompleted,
        overallScore,
        reportsApproved: reports,
        activityHeatmap,
      },
    });
  } catch (error) {
    console.error("[Intern Progress Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get interns with goal counts
// @route   GET /api/users/interns
// @access  Private
export const getInterns = async (req, res) => {
  try {
    const interns = await User.find({ role: "intern" }).select(
      "name email department avatar isActive",
    );

    // Enrich each intern with goal counts
    const internsWithGoals = await Promise.all(
      interns.map(async (intern) => {
        const [goalsCompleted, goalsAssigned] = await Promise.all([
          Goal.countDocuments({ assignedTo: intern._id, status: "Approved" }),
          Goal.countDocuments({ assignedTo: intern._id }),
        ]);

        return {
          _id: intern._id,
          name: intern.name,
          email: intern.email,
          department: intern.department,
          avatar: intern.avatar,
          isActive: intern.isActive,
          goalsCompleted,
          goalsAssigned,
        };
      }),
    );

    res.status(200).json({ success: true, data: internsWithGoals });
  } catch (error) {
    console.error("[Get Interns Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
