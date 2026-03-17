import Report from '../models/Report.model.js';
import Goal from '../models/Goal.model.js';
import Notification from '../models/Notification.model.js';

export const submitReport = async (req, res) => {
  try {
    req.body.intern = req.user.id;
    const report = await Report.create(req.body);

    // Update goal status
    const goal = await Goal.findById(req.body.goal);
    await Goal.findByIdAndUpdate(req.body.goal, { status: 'Submitted' });

    // Notify manager
    await Notification.create({
      recipient: goal.createdBy,
      type: 'report_submitted',
      message: `${req.user.name} submitted a report for ${goal.title}`,
    });

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getReviewQueue = async (req, res) => {
  try {
    const goals = await Goal.find({ createdBy: req.user.id });
    const goalIds = goals.map(g => g._id);
    const reports = await Report.find({ goal: { $in: goalIds }, status: 'Submitted' })
      .populate('intern', 'name email')
      .populate('goal', 'title');
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const reviewReport = async (req, res) => {
  try {
    const { status, managerFeedback, score } = req.body;
    const report = await Report.findByIdAndUpdate(req.params.id, {
      status, managerFeedback, score, reviewedAt: Date.now()
    }, { new: true });

    // Update goal status
    const goalStatus = status === 'Approved' ? 'Approved' : 'Revision-Required';
    await Goal.findByIdAndUpdate(report.goal, { status: goalStatus });

    // Notify intern
    await Notification.create({
      recipient: report.intern,
      type: status === 'Approved' ? 'report_approved' : 'report_rejected',
      message: `Your report has been ${status.toLowerCase()}`,
    });

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
