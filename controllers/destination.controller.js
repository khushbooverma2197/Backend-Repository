// Destination controller
const Destination = require('../models/destination.model');

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.getAll();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
};

exports.searchDestinations = async (req, res) => {
  try {
    const { interests, climate, season, budget, offTheBeatenPath } = req.query;
    const destinations = await Destination.search({
      interests,
      climate,
      season,
      budget: budget ? parseFloat(budget) : null,
      offTheBeatenPath: offTheBeatenPath === 'true'
    });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search destinations' });
  }
};

exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const { interests } = req.body;
    const recommendations = await Destination.getRecommendations(interests);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.getById(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
};

exports.getBudgetEstimate = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { duration, travelers } = req.query;
    const estimate = await Destination.calculateBudget(
      destinationId,
      parseInt(duration) || 7,
      parseInt(travelers) || 1
    );
    res.json(estimate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate budget estimate' });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const newDestination = await Destination.create(req.body);
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create destination' });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const updated = await Destination.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Destination not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update destination' });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const deleted = await Destination.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Destination not found' });
    res.json({ message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete destination' });
  }
};
