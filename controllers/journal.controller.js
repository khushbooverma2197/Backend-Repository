// Journal controller for travel diaries
const Journal = require('../models/journal.model');

exports.getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.getAll();
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
};

exports.getJournalsByUser = async (req, res) => {
  try {
    const journals = await Journal.getByUserId(req.params.userId);
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user journals' });
  }
};

exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.getById(req.params.id);
    if (!journal) return res.status(404).json({ error: 'Journal not found' });
    res.json(journal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journal' });
  }
};

exports.createJournal = async (req, res) => {
  try {
    const newJournal = await Journal.create(req.body);
    res.status(201).json(newJournal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create journal' });
  }
};

exports.updateJournal = async (req, res) => {
  try {
    const updated = await Journal.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Journal not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update journal' });
  }
};

exports.deleteJournal = async (req, res) => {
  try {
    const deleted = await Journal.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Journal not found' });
    res.json({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete journal' });
  }
};
