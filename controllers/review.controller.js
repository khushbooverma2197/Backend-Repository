// Review controller for traveler insights
const Review = require('../models/review.model');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.getAll();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews',
      details: error.message 
    });
  }
};

exports.getReviewsByDestination = async (req, res) => {
  try {
    const reviews = await Review.getByDestinationId(req.params.destinationId);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching destination reviews:', error);
    res.status(500).json({ 
      error: 'Failed to fetch destination reviews',
      details: error.message 
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    console.log('Creating review with data:', req.body);
    
    // Validate required fields
    if (!req.body.destinationId || !req.body.content || !req.body.rating) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Destination, content, and rating are required'
      });
    }
    
    // Validate rating
    const rating = parseInt(req.body.rating);
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Invalid rating',
        details: 'Rating must be between 1 and 5'
      });
    }
    
    const newReview = await Review.create(req.body);
    console.log('Review created successfully:', newReview);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', error.details);
    console.error('Error hint:', error.hint);
    res.status(500).json({ 
      error: 'Failed to create review',
      details: error.message,
      hint: error.hint || 'Check server logs for details'
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    console.log('Updating review:', req.params.id, 'with data:', req.body);
    const updated = await Review.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ 
      error: 'Failed to update review',
      details: error.message 
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ 
      error: 'Failed to delete review',
      details: error.message 
    });
  }
};
