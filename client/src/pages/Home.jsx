import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">Welcome to UniType</h1>
      <p className="text-lg text-gray-600 mt-2">Test your typing skills and compete with others!</p>
      <div className="mt-6">
        <Link to="/game" className="px-6 py-2 bg-blue-600 text-white rounded">Start Game</Link>
        <Link to="/leaderboard" className="px-6 py-2 bg-gray-600 text-white rounded ml-4">View Leaderboard</Link>
      </div>
    </div>
  );
};

export default Home;
