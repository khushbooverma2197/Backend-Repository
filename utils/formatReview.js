// Utility to convert between frontend (camelCase) and database (snake_case) for reviews

const toDatabase = (review) => {
  const dbReview = {
    rating: parseInt(review.rating) || 5,
    content: review.content
  };

  // Only add destination_id if provided
  if (review.destinationId) {
    dbReview.destination_id = review.destinationId;
  }

  // Only add user_name if provided (not required anymore)
  if (review.userName) {
    dbReview.user_name = review.userName;
  }

  // Only add title if provided
  if (review.title) {
    dbReview.title = review.title;
  }

  // Only add optional fields if they have values
  if (review.photos && review.photos.length > 0) {
    dbReview.photos = review.photos;
  }

  if (review.tips && review.tips.length > 0) {
    dbReview.tips = review.tips;
  }

  return dbReview;
};

const fromDatabase = (review) => {
  if (!review) return null;
  
  return {
    id: review.id,
    destinationId: review.destination_id,
    userId: review.user_id,
    userName: review.user_name,
    rating: review.rating,
    title: review.title,
    content: review.content,
    photos: review.photos || [],
    tips: review.tips || [],
    createdAt: review.created_at
  };
};

module.exports = { toDatabase, fromDatabase };
