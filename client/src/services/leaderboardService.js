import axios from 'axios';

// Fetch the leaderboard (Top 10 scores)
export const getLeaderboard = async () => {
  try {
    const response = await axios.get('/api/leaderboard');
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch leaderboard');
  }
};
