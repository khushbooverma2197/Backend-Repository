// Destination routes
const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Get all destinations
router.get('/', destinationController.getAllDestinations);
// Search destinations with filters
router.get('/search', destinationController.searchDestinations);
// Get personalized recommendations
router.post('/recommendations', destinationController.getPersonalizedRecommendations);
// Get budget estimate for a destination
router.get('/:destinationId/budget', destinationController.getBudgetEstimate);
// Get destination by ID
router.get('/:id', destinationController.getDestinationById);
// Create new destination (protected)
router.post('/', authMiddleware, destinationController.createDestination);
// Update destination (protected)
router.put('/:id', authMiddleware, destinationController.updateDestination);
// Delete destination (protected)
router.delete('/:id', authMiddleware, destinationController.deleteDestination);

module.exports = router;
