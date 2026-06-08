import Support from "../models/Support.model.js";
import User from "../models/User.model.js";

/**
 * POST /api/support
 * Submit a support ticket
 */
export const submitSupport = async (req, res) => {
  try {
    const { subject, message, category } = req.body;

    if (!subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Subject and message are required" });
    }

    const supportTicket = await Support.create({
      subject,
      message,
      category: category || "general",
      submittedBy: req.user.id,
    });

    res.status(201).json({ success: true, data: supportTicket });
  } catch (error) {
    console.error("[Submit Support Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/support
 * Get support tickets - for users, show their own; for admins, show all
 */
export const getSupport = async (req, res) => {
  try {
    let query;

    if (req.user.role === "admin") {
      // Admins see all tickets
      query = Support.find()
        .populate("submittedBy", "name email role")
        .populate("responses.respondedBy", "name email");
    } else {
      // Users see only their own tickets
      query = Support.find({ submittedBy: req.user.id })
        .populate("submittedBy", "name email role")
        .populate("responses.respondedBy", "name email");
    }

    const tickets = await query.sort("-createdAt");
    res
      .status(200)
      .json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    console.error("[Get Support Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * PATCH /api/support/:id/respond
 * Add admin response to support ticket (Admin Only)
 */
export const respondSupport = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Response message is required" });
    }

    const ticket = await Support.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          responses: {
            respondedBy: req.user.id,
            message,
          },
        },
        updatedAt: Date.now(),
      },
      { new: true },
    )
      .populate("submittedBy", "name email role")
      .populate("responses.respondedBy", "name email");

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    console.error("[Respond Support Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * PATCH /api/support/:id/status
 * Update support ticket status (Admin Only)
 */
export const updateSupportStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }

    const updateData = { status, updatedAt: Date.now() };
    if (priority) updateData.priority = priority;

    const ticket = await Support.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    })
      .populate("submittedBy", "name email role")
      .populate("responses.respondedBy", "name email");

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    console.error("[Update Status Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/support/:id
 * Get single support ticket details
 */
export const getSupportById = async (req, res) => {
  try {
    const ticket = await Support.findById(req.params.id)
      .populate("submittedBy", "name email role")
      .populate("responses.respondedBy", "name email");

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Support ticket not found" });
    }

    // Verify ownership: user can view their own tickets, admins can view all
    const isOwner = ticket.submittedBy._id.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to view this ticket",
        });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    console.error("[Get Support By ID Error]:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
