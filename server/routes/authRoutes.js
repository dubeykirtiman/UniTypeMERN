import express from 'express';
import { register, login, logout } from '../controllers/authController.js';  // Named imports
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', authMiddleware.verifyToken, logout);

export default router;
