import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: String,
  assignedTo: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In-Progress', 'Submitted', 'Approved', 'Revision-Required'],
    default: 'Pending',
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline'],
  },
  points: {
    type: Number,
    default: 10,
  },
  week: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Goal', goalSchema);
