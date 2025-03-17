import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/gameContext';
import ScoreBoard from '../components/ScoreBoard';

const Game = () => {
  const { score, setScore } = useContext(GameContext);
  const [input, setInput] = useState('');
  const [word, setWord] = useState('example');

  useEffect(() => {
    const words = ['react', 'javascript', 'typing', 'game', 'challenge'];
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, [score]);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === word) {
      setScore(score + 10);
      setInput('');
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Typing Game</h1>
      <p className="text-xl font-semibold">{word}</p>
      <input type="text" value={input} onChange={handleChange} className="border p-2 mt-4" />
      <ScoreBoard />
    </div>
  );
};

export default Game;
