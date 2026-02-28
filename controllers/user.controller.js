// User controller for preferences
const User = require('../models/user.model');

exports.getUserPreferences = async (req, res) => {
  try {
    const preferences = await User.getPreferences(req.params.userId);
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user preferences' });
  }
};

exports.updateUserPreferences = async (req, res) => {
  try {
    const updated = await User.updatePreferences(req.params.userId, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
