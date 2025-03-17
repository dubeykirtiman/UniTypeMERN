import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Game from './pages/Game';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/authContext';
import { GameProvider } from './context/gameContext';
import { LeaderboardProvider } from './context/leaderboardContext';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('token', authToken);
    } else {
      localStorage.removeItem('token');
    }
  }, [authToken]);

  return (
    <AuthProvider>
      <GameProvider>
        <LeaderboardProvider>
          <Router>
            <Navbar authToken={authToken} setAuthToken={setAuthToken} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
        </LeaderboardProvider>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
