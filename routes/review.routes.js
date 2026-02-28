// Review routes
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// Get all reviews
router.get('/', reviewController.getAllReviews);
// Get reviews by destination
router.get('/destination/:destinationId', reviewController.getReviewsByDestination);
// Create new review
router.post('/', reviewController.createReview);
// Update review
router.put('/:id', reviewController.updateReview);
// Delete review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
