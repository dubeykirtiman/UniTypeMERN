import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';  // Named imports
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware.verifyToken, getUserProfile);  // Use the named import directly

// Update user profile
router.put('/profile', authMiddleware.verifyToken, updateUserProfile);  // Use the named import directly

export default router;
