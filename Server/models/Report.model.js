import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  intern: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  goal: {
    type: mongoose.Schema.ObjectId,
    ref: 'Goal',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Please add report content'],
  },
  aiSummary: String,
  status: {
    type: String,
    enum: ['Submitted', 'Approved', 'Revision-Required'],
    default: 'Submitted',
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
  managerFeedback: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: Date,
});

export default mongoose.model('Report', reportSchema);
