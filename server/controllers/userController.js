import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Assumes userId is verified in authMiddleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't send the password in the response
    res.status(200).json({ username: user.username, score: user.score });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    return res.status(400).json({ message: 'Username or password must be provided' });
  }

  try {
    const user = await User.findById(req.userId); // Assumes userId is verified in authMiddleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update username if provided
    if (username) user.username = username;

    // Update password if provided
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user details
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
