// Journal controller for travel diaries
const Journal = require('../models/journal.model');

exports.getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.getAll();
    res.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).json({ 
      error: 'Failed to fetch journals',
      details: error.message 
    });
  }
};

exports.getJournalsByUser = async (req, res) => {
  try {
    const journals = await Journal.getByUserId(req.params.userId);
    res.json(journals);
  } catch (error) {
    console.error('Error fetching user journals:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user journals',
      details: error.message 
    });
  }
};

exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.getById(req.params.id);
    if (!journal) return res.status(404).json({ error: 'Journal not found' });
    res.json(journal);
  } catch (error) {
    console.error('Error fetching journal:', error);
    res.status(500).json({ 
      error: 'Failed to fetch journal',
      details: error.message 
    });
  }
};

exports.createJournal = async (req, res) => {
  try {
    console.log('Creating journal with data:', req.body);
    
    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Title and content are required'
      });
    }
    
    const newJournal = await Journal.create(req.body);
    console.log('Journal created successfully:', newJournal);
    res.status(201).json(newJournal);
  } catch (error) {
    console.error('Error creating journal:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to create journal',
      details: error.message,
      hint: error.hint || 'Check server logs for details'
    });
  }
};

exports.updateJournal = async (req, res) => {
  try {
    console.log('Updating journal:', req.params.id, 'with data:', req.body);
    const updated = await Journal.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Journal not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating journal:', error);
    res.status(500).json({ 
      error: 'Failed to update journal',
      details: error.message 
    });
  }
};

exports.deleteJournal = async (req, res) => {
  try {
    const deleted = await Journal.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Journal not found' });
    res.json({ message: 'Journal deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal:', error);
    res.status(500).json({ 
      error: 'Failed to delete journal',
      details: error.message 
    });
  }
};
