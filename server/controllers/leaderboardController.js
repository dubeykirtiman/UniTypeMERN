import Leaderboard from '../models/Leaderboard.js';

// Get Top 10 Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    // Find the leaderboard and populate the userId field with username
    const leaderboard = await Leaderboard.findOne()
      .populate('users.userId', 'username')
      .sort({'users.score': -1}) // Sorting at the database level
      .limit(10); // Limit to top 10 users

    // Check if the leaderboard is empty or does not exist
    if (!leaderboard || leaderboard.users.length === 0) {
      return res.status(404).json({ message: 'Leaderboard not found or empty' });
    }

    // Send the leaderboard users as the response
    res.status(200).json({
      message: 'Leaderboard retrieved successfully',
      leaderboard: leaderboard.users
    });
  } catch (error) {
    console.error('Error retrieving leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
