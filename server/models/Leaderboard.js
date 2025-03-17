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
    min: 0 // Optional: Prevent negative scores
  },
  gameId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', // If you have a Game model
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

// Optionally, create a unique index for userId and gameId to prevent duplicate entries
leaderboardSchema.index({ userId: 1, gameId: 1 }, { unique: true });

// Create an index for sorting by score in descending order (for leaderboard optimization)
leaderboardSchema.index({ score: -1 });

export default mongoose.model('Leaderboard', leaderboardSchema);
