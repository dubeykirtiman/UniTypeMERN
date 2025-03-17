import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>High Score:</strong> {user.highScore}</p>
    </div>
  );
};

export default Profile;
