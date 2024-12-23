const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');

const router = express.Router();

router.post('/', leaderboardController.createEntry); 
router.get('/:id', leaderboardController.getEntryById);
router.put('/:id', leaderboardController.updateEntryById); 
router.delete('/:id', leaderboardController.deleteEntryById); 
router.get('/event/:eventId', leaderboardController.getLeaderboardByEventId);

module.exports = router;