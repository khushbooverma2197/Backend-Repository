// Journal routes
const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journal.controller');

// Get all journals (public)
router.get('/', journalController.getAllJournals);
// Get journals by user
router.get('/user/:userId', journalController.getJournalsByUser);
// Get journal by ID
router.get('/:id', journalController.getJournalById);
// Create new journal
router.post('/', journalController.createJournal);
// Update journal
router.put('/:id', journalController.updateJournal);
// Delete journal
router.delete('/:id', journalController.deleteJournal);

module.exports = router;
