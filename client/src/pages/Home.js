import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Typing Game</h1>
        <p className="text-lg mb-6">Test your typing speed and improve your skills</p>

        <div className="space-x-4">
          <Link to="/game">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Start Game
            </button>
          </Link>
          <Link to="/scoreboard">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              View Leaderboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
