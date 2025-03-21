import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // ✅ Unique is already defined, no need for extra index
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username must be less than or equal to 20 characters'],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ Removed duplicate index on username
// ✅ Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ✅ Compare password function
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
