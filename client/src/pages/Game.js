import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ScoreBoard from './ScoreBoard';
import { submitGameScore } from '../services/gameService';

const Game = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const history = useHistory();

  // Sample words for the game
  const words = ['apple', 'banana', 'orange', 'grape', 'pineapple', 'mango', 'cherry'];

  useEffect(() => {
    // Start a new round of the game when the component mounts
    startNewRound();

    // Cleanup function to reset game state when the component unmounts
    return () => {
      setScore(0);
      setGameOver(false);
      setWord('');
      setInput('');
    };
  }, []);

  const startNewRound = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setInput('');
    setScore(0);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === word) {
      setScore(score + 10);
      setInput('');
      startNewRound();
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    submitGameScore(score)
      .then(() => {
        history.push('/scoreboard');
      })
      .catch((err) => {
        console.error('Error submitting score:', err);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      {!gameOver ? (
        <div className="text-center p-4 bg-white shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4">Type the Word</h1>
          <p className="text-xl mb-4">Score: {score}</p>
          <div className="text-xl mb-4">
            <span className="font-semibold">Current Word:</span> {word}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 text-center text-xl border border-gray-300 rounded-lg mb-4"
            placeholder="Type here..."
          />
          <button
            onClick={handleGameOver}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600"
          >
            End Game
          </button>
        </div>
      ) : (
        <ScoreBoard score={score} onRetry={startNewRound} />
      )}
    </div>
  );
};

export default Game;
