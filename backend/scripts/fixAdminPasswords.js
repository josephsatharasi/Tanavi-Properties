require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const fixAdminPasswords = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Find all admin users
    const admins = await User.find({ role: 'admin' });
    console.log(`\nFound ${admins.length} admin user(s)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (admins.length === 0) {
      console.log('No admin users found. Creating default admin...\n');
      
      const defaultPassword = 'admin123';
      const admin = await User.create({
        name: 'Admin',
        email: 'admin@tanavi.com',
        password: defaultPassword, // Will be hashed by model
        role: 'admin',
        isVerified: true
      });

      console.log('✓ Default admin created!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', admin.email);
      console.log('🔑 Password:', defaultPassword);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } else {
      // For each admin, reset password to a known value
      for (const admin of admins) {
        console.log(`Processing admin: ${admin.email}`);
        
        // Set a new password (will be hashed by model pre-save hook)
        const newPassword = 'admin123';
        admin.password = newPassword;
        await admin.save();
        
        console.log(`✓ Password reset for: ${admin.email}`);
        console.log(`  New password: ${newPassword}`);
        console.log(`  Name: ${admin.name}`);
        console.log(`  Role: ${admin.role}`);
        console.log('');
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n✓ All admin passwords have been reset!`);
      console.log(`  Total admins: ${admins.length}`);
      console.log(`  Default password: admin123`);
      console.log('\n⚠️  IMPORTANT: Change passwords after first login!');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

fixAdminPasswords();
