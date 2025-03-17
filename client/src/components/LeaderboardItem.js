import React from 'react';

const LeaderboardItem = ({ username, score }) => {
    return (
        <div className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
            <div className="text-lg font-medium">{username}</div>
            <div className="text-lg font-semibold">{score}</div>
        </div>
    );
};

export default LeaderboardItem;
