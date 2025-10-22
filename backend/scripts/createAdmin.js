const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✓ MongoDB connected');
    
    const adminExists = await User.findOne({ email: 'admin@tanavi.com' });
    if (adminExists) {
      console.log('\n✓ Admin user already exists!');
      console.log('\n📧 Email: admin@tanavi.com');
      console.log('🔑 Password: admin123');
      console.log('\n🌐 Login at: http://localhost:3000/admin/login');
      process.exit(0);
    }

    await User.create({
      name: 'Admin',
      email: 'admin@tanavi.com',
      password: 'admin123',
      role: 'admin',
      phone: '1234567890'
    });

    console.log('\n✓ Admin user created successfully!');
    console.log('\n📧 Email: admin@tanavi.com');
    console.log('🔑 Password: admin123');
    console.log('\n🌐 Login at: http://localhost:3000/admin/login');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
