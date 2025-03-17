import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/authContext';
import { GameProvider } from './context/gameContext';
import { LeaderboardProvider } from './context/leaderboardContext';

const App = () => {
  return (
    <AuthProvider>
      <GameProvider>
        <LeaderboardProvider>
          <Router>
            <Navbar />
            <div className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
        </LeaderboardProvider>
      </GameProvider>
    </AuthProvider>
  );
};

export default App;
