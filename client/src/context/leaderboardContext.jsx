import { createContext, useState, useEffect } from 'react';
import { getLeaderboard } from '../services/leaderboardService';

export const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboard, fetchLeaderboard }}>
      {children}
    </LeaderboardContext.Provider>
  );
};
