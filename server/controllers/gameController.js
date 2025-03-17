import User from '../models/User.js';
import Leaderboard from '../models/Leaderboard.js';

// Update User's Score After Game
export const submitScore = async (req, res) => {
  const { userId, score } = req.body;

  // Validate input data
  if (!userId || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid data: userId or score is missing or incorrect' });
  }

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's score if it's higher than the current one
    if (score > user.score) {
      user.score = score;
      await user.save().catch(err => {
        return res.status(500).json({ message: 'Error saving user score' });
      });
    }

    // Find the leaderboard or create a new one if it doesn't exist
    let leaderboard = await Leaderboard.findOne();
    if (!leaderboard) {
      leaderboard = new Leaderboard({ users: [] });
    }

    // Check if the submitted score qualifies for the leaderboard (top 10)
    const isTop10 = leaderboard.users.length < 10 || score > leaderboard.users[9].score;

    if (isTop10) {
      // Remove the lowest score if the leaderboard has 10 users
      if (leaderboard.users.length >= 10) {
        leaderboard.users.pop();
      }

      // Add the user and score to the leaderboard
      leaderboard.users.push({ userId, score });
      leaderboard.users.sort((a, b) => b.score - a.score); // Sort descending by score

      // Save the updated leaderboard
      await leaderboard.save().catch(err => {
        return res.status(500).json({ message: 'Error saving leaderboard' });
      });
    }

    // Return a success response along with the updated leaderboard
    res.status(200).json({
      message: 'Score submitted and leaderboard updated successfully',
      leaderboard: leaderboard.users, // Optionally include the updated leaderboard
    });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
