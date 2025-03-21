import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaderboard';

// Get leaderboard
export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
