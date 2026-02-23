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

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.getById(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destination' });
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
