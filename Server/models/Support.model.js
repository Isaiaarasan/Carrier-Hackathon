import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Please add a subject"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Please add a message"],
  },
  submittedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    enum: ["technical", "feature-request", "billing", "general", "bug-report"],
    default: "general",
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "resolved", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },
  responses: [
    {
      respondedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Support", supportSchema);
