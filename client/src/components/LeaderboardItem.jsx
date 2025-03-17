import React from 'react';

const LeaderboardItem = ({ rank, username, score }) => {
  return (
    <tr className="border-b">
      <td className="py-2 px-4">{rank}</td>
      <td className="py-2 px-4">{username}</td>
      <td className="py-2 px-4">{score}</td>
    </tr>
  );
};

export default LeaderboardItem;
