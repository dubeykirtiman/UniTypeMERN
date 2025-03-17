import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then(res => setLeaders(res.data))
      .catch(err => console.error("Failed to fetch leaderboard:", err));
  }, []);

  return (
    <div className="mt-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Leaderboard</h2>
      <table className="table-auto border-collapse border border-gray-500 mx-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2">Rank</th>
            <th className="border border-gray-500 px-4 py-2">Username</th>
            <th className="border border-gray-500 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((player, index) => (
            <tr key={player.id} className="bg-white">
              <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-500 px-4 py-2">{player.username}</td>
              <td className="border border-gray-500 px-4 py-2">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
