// Review controller for traveler insights
const Review = require('../models/review.model');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.getAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

exports.getReviewsByDestination = async (req, res) => {
  try {
    const reviews = await Review.getByDestinationId(req.params.destinationId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destination reviews' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updated = await Review.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
