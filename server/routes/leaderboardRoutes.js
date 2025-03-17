import { getLeaderboard } from '../controllers/leaderboardController.js'; // Named import

const router = express.Router();

// Get leaderboard route
router.get('/', getLeaderboard);  // Use the named export function directly

export default router;
