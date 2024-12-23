/*const {
    createLeaderboardEntry,
    getLeaderboardEntryById,
    updateLeaderboardEntryById,
    deleteLeaderboardEntryById,
    Leaderboard
  }=require('../models/leaderboard')*/

const Leaderboard = require('../models/leaderboard');

const leaderboardController = {
  // Create a new leaderboard entry
  createEntry: async (req, res) => {
    const { event_id, user_id, points, rank } = req.body;

    try {
      if (!event_id || !user_id || !rank) {
        return res.status(400).json({ error: 'event_id, user_id, and rank are required' });
      }

      const newEntry = { event_id, user_id, points, rank };
      const createdEntry = await Leaderboard.createLeaderboardEntry(newEntry);

      res.status(201).json({
        message: 'Leaderboard entry created successfully',
        entry: createdEntry,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get a leaderboard entry by ID
  getEntryById: async (req, res) => {
    const { id } = req.params;

    try {
      const entry = await Leaderboard.getLeaderboardEntryById(id).populate('event_id user_id');
      if (!entry) {
        return res.status(404).json({ error: 'Leaderboard entry not found' });
      }

      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a leaderboard entry by ID
  updateEntryById: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedEntry = await Leaderboard.updateLeaderboardEntryById(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!updatedEntry) {
        return res.status(404).json({ error: 'Leaderboard entry not found' });
      }

      res.status(200).json({
        message: 'Leaderboard entry updated successfully',
        entry: updatedEntry,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a leaderboard entry by ID
  deleteEntryById: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedEntry = await Leaderboard.deleteLeaderboardEntryById(id);

      if (!deletedEntry) {
        return res.status(404).json({ error: 'Leaderboard entry not found' });
      }

      res.status(200).json({ message: 'Leaderboard entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all leaderboard entries for a specific event
  getLeaderboardByEventId: async (req, res) => {
    const { eventId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 entries per page
  
    try {
      const leaderboard = await Leaderboard.find({ event_id: eventId })
        .populate('user_id', 'username') // Adjust fields as needed
        .sort({ points: -1, rank: 1 }); // Sort by points descending and rank ascending
  
      const totalEntries = leaderboard.length; // Total entries for this event
      const paginatedEntries = leaderboard.slice((page - 1) * limit, page * limit); // Paginate results
      const totalPages = Math.ceil(totalEntries / limit);
  
      res.status(200).json({
        entries: paginatedEntries,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },  
};

module.exports = leaderboardController;
