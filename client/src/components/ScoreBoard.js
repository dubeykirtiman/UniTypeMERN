import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ScoreBoard = ({ score, onRetry }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (score >= 80) {
      setMessage('Great job! You scored high!');
    } else if (score >= 50) {
      setMessage('Good effort! Keep practicing.');
    } else {
      setMessage('Keep trying! You can improve.');
    }
  }, [score]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-center mb-4">Game Over</h2>
      <p className="text-lg text-center mb-4">Your Score: {score}</p>
      <p className="text-center mb-6">{message}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Retry Game
        </button>
        <Link
          to="/leaderboard"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default ScoreBoard;
