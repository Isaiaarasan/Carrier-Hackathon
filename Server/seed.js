import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.model.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 Connected to MongoDB for seeding...');

    // Clear existing users to avoid duplicates in demo
    await User.deleteMany({ email: { $in: ['admin@internpulse.com', 'manager@internpulse.com', 'intern@internpulse.com'] } });

    const users = [
      {
        name: 'System Admin',
        email: 'admin@internpulse.com',
        password: 'admin123',
        role: 'admin',
        isPasswordChanged: true,
        isOnboarded: true,
        department: 'Operations'
      },
      {
        name: 'Sarah Manager',
        email: 'manager@internpulse.com',
        password: 'manager123',
        role: 'manager',
        isPasswordChanged: true,
        isOnboarded: true,
        department: 'Engineering'
      },
      {
        name: 'James Intern',
        email: 'intern@internpulse.com',
        password: 'intern123',
        role: 'intern',
        isPasswordChanged: true,
        isOnboarded: true,
        department: 'Engineering',
        bio: 'Aspiring Full Stack Developer'
      }
    ];

    for (const u of users) {
      await User.create(u);
    }

    console.log('✅ Seeding Complete!');
    console.log('-------------------');
    console.log('Admin login: admin@internpulse.com / admin123');
    console.log('Manager login: manager@internpulse.com / manager123');
    console.log('Intern login: intern@internpulse.com / intern123');
    console.log('-------------------');

    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedUsers();
