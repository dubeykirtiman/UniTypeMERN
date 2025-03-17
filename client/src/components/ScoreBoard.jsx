import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/leaderboardService';

const ScoreBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-lg w-80">
      <h3 className="text-lg font-bold mb-2">Leaderboard</h3>
      <ul>
        {players.slice(0, 5).map((player, index) => (
          <li key={player.id} className="border-b py-1 flex justify-between">
            <span>{index + 1}. {player.name}</span>
            <span>{player.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;
