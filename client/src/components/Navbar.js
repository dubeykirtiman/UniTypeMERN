import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../services/authService'; // Assumed that logout logic is defined here

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    logout(); // Assume logout clears local storage and cookies
    setIsLoggedIn(false);
    history.push('/'); // Redirect to home page after logout
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          UniType
        </Link>
        <div>
          <Link to="/" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
            Home
          </Link>
          <Link to="/game" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
            Game
          </Link>
          <Link to="/leaderboard" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
            Leaderboard
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                Login
              </Link>
              <Link to="/register" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
