import axios from 'axios';

// Submit game score
export const submitGameScore = async (userId, score) => {
  try {
    const response = await axios.post('/api/game/submit', { userId, score });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Score submission failed');
  }
};
