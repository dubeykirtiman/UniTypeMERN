import express from 'express';
import { submitScore } from '../controllers/gameController.js'; // Use named import for submitScore

const router = express.Router();

// Submit game score route
router.post('/submit', submitScore);  // Use submitScore directly here

export default router;
