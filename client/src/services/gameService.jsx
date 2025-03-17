import axios from 'axios';

const API_URL = 'http://localhost:5000/api/game';

// Submit game score
export const submitGameScore = async (token, score) => {
  try {
    const response = await axios.post(
      `${API_URL}/submit`,
      { score },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
