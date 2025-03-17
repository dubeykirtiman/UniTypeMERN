import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">UniType</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/game" className="mx-2">Game</Link>
        <Link to="/leaderboard" className="mx-2">Leaderboard</Link>
        {user ? (
          <>
            <Link to="/profile" className="mx-2">Profile</Link>
            <button onClick={handleLogout} className="mx-2 bg-red-600 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mx-2">Login</Link>
            <Link to="/register" className="mx-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
