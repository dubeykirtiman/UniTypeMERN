import mongoose from 'mongoose';

// Define the schema for each leaderboard entry
const leaderboardSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  score: { 
    type: Number, 
    required: true,
    min: 0 // Prevents negative scores
  },
  gameId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', 
    required: false // ✅ Changed to optional in case not all scores are tied to a game
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

// ✅ Unique constraint on userId & gameId to prevent duplicate entries
leaderboardSchema.index({ userId: 1, gameId: 1 }, { unique: true });

// ✅ Removed score index (only needed if sorting frequently)
export default mongoose.model('Leaderboard', leaderboardSchema);
