import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      isPasswordChanged: user.isPasswordChanged,
      isOnboarded: user.isOnboarded,
    },
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Change password (first time login)
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    user.password = req.body.newPassword;
    user.isPasswordChanged = true;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Complete onboarding
// @route   PUT /api/auth/onboard
// @access  Private
export const onboard = async (req, res) => {
  try {
    const { department, bio, avatar, skills } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, {
      department,
      bio, // assuming bio field exists or can be added
      avatar,
      isOnboarded: true
    }, { new: true });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

// @desc    Admin creates a user (Initial password is email)
// @route   POST /api/auth/create-user
// @access  Private (Admin)
export const adminCreateUser = async (req, res) => {
  try {
    const { name, email, role, department } = req.body;
    
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Initial password = email
    const user = await User.create({
      name,
      email,
      role,
      department,
      password: email, // Will be hashed by pre-save hook
      isPasswordChanged: false,
      isOnboarded: false
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
