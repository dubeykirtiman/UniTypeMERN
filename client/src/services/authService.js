import axios from 'axios';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Registration failed');
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Login failed');
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await axios.post('/api/auth/logout');
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Logout failed');
  }
};
