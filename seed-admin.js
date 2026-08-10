const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGODB_URI = 'mongodb://localhost:27017/goodshowroom';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: { type: String, enum: ['super_admin', 'admin', 'user'], default: 'user' },
    staffRole: String,
    isActive: { type: Boolean, default: true },
    lastSignedIn: Date,
    refreshToken: String,
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

const CREDENTIALS = {
  name: 'Super Admin',
  email: 'admin@goodshowroom.com',
  password: 'Admin@123456',
  phone: '0400000000',
  role: 'super_admin',
  staffRole: 'admin',
  isActive: true,
};

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB...');

  const existing = await User.findOne({ email: CREDENTIALS.email });
  if (existing) {
    console.log('⚠️  Super admin already exists with email:', CREDENTIALS.email);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(CREDENTIALS.password, 10);

  const user = await User.create({
    ...CREDENTIALS,
    password: hashedPassword,
  });

  console.log('\n✅ Super Admin created successfully!');
  console.log('─────────────────────────────────────');
  console.log('  Email    :', CREDENTIALS.email);
  console.log('  Password :', CREDENTIALS.password);
  console.log('  Role     :', CREDENTIALS.role);
  console.log('  _id      :', user._id.toString());
  console.log('─────────────────────────────────────\n');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
