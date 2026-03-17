import Goal from '../models/Goal.model.js';
import Notification from '../models/Notification.model.js';

export const createGoal = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const goal = await Goal.create(req.body);

    // Create notifications for assigned interns
    const notifications = req.body.assignedTo.map(internId => ({
      recipient: internId,
      type: 'goal_assigned',
      message: `New goal assigned: ${goal.title}`,
    }));
    await Notification.insertMany(notifications);

    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    let query;
    if (req.user.role === 'intern') {
      query = Goal.find({ assignedTo: req.user.id });
    } else {
      query = Goal.find({ createdBy: req.user.id });
    }
    const goals = await query.populate('assignedTo', 'name email');
    res.status(200).json({ success: true, count: goals.length, data: goals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateGoalStatus = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
