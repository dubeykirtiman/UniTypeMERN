import Leaderboard from '../models/Leaderboard.js';

// Get Top 10 Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    // Find the leaderboard and populate the userId field with username
    const leaderboard = await Leaderboard.findOne().populate('users.userId', 'username');

    // Check if the leaderboard is empty or does not exist
    if (!leaderboard || leaderboard.users.length === 0) {
      return res.status(404).json({ message: 'Leaderboard not found or empty' });
    }

    // Sort users by score in descending order and limit to top 10
    const sortedUsers = leaderboard.users.sort((a, b) => b.score - a.score).slice(0, 10);

    // Send the leaderboard users as the response
    res.status(200).json({
      message: 'Leaderboard retrieved successfully',
      leaderboard: sortedUsers,
    });
  } catch (error) {
    console.error('Error retrieving leaderboard:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
