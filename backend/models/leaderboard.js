// Import mongoose
const mongoose = require('mongoose');

// Define the leaderboard schema
const leaderboardSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  rank: {
    type: Number,
    min: 1,
    required: true
  }
});

// Create a unique index for efficient querying on event_id and user_id
leaderboardSchema.index({ event_id: 1, user_id: 1 }, { unique: true });

// Compile the model
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// CRUD Operations

// Create a new leaderboard entry
async function createLeaderboardEntry(data) {
  try {
    const leaderboardEntry = new Leaderboard(data);
    await leaderboardEntry.save();
    console.log("Leaderboard entry created successfully");
    return leaderboardEntry;
  } catch (error) {
    console.error("Error creating leaderboard entry:", error);
    throw error;
  }
}

// Read (Get) a leaderboard entry by ID
async function getLeaderboardEntryById(entryId) {
  try {
    const leaderboardEntry = await Leaderboard.findById(entryId)
      .populate('event_id user_id'); // Optional: populate references
    if (!leaderboardEntry) {
      throw new Error("Leaderboard entry not found");
    }
    return leaderboardEntry;
  } catch (error) {
    console.error("Error fetching leaderboard entry:", error);
    throw error;
  }
}

// Update a leaderboard entry by ID
async function updateLeaderboardEntryById(entryId, updateData) {
  try {
    const updatedLeaderboardEntry = await Leaderboard.findByIdAndUpdate(
      entryId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedLeaderboardEntry) {
      throw new Error("Leaderboard entry not found");
    }
    console.log("Leaderboard entry updated successfully");
    return updatedLeaderboardEntry;
  } catch (error) {
    console.error("Error updating leaderboard entry:", error);
    throw error;
  }
}

// Delete a leaderboard entry by ID
async function deleteLeaderboardEntryById(entryId) {
  try {
    const deletedLeaderboardEntry = await Leaderboard.findByIdAndDelete(entryId);
    if (!deletedLeaderboardEntry) {
      throw new Error("Leaderboard entry not found");
    }
    console.log("Leaderboard entry deleted successfully");
    return deletedLeaderboardEntry;
  } catch (error) {
    console.error("Error deleting leaderboard entry:", error);
    throw error;
  }
}

// Export the model and CRUD functions
module.exports = {
  Leaderboard,
  createLeaderboardEntry,
  getLeaderboardEntryById,
  updateLeaderboardEntryById,
  deleteLeaderboardEntryById
};
