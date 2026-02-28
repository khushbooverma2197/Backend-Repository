// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get user by ID
router.get('/:userId', userController.getUserById);
// Create new user
router.post('/', userController.createUser);
// Get user preferences
router.get('/:userId/preferences', userController.getUserPreferences);
// Update user preferences
router.put('/:userId/preferences', userController.updateUserPreferences);

module.exports = router;
