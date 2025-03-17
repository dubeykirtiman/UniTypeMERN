import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/userService'; // Assuming you have a service to interact with the backend
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(); // Fetch user profile from backend
        setUserData({
          username: profile.username,
          password: '', // Password should not be pre-filled
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load user profile');
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(userData); // Send updated data to the backend
      setSuccessMessage('Profile updated successfully!');
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
      setSuccessMessage('');
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Profile</h1>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-left text-lg">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-lg">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => history.push('/')}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
