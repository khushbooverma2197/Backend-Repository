// Utility to convert between frontend (camelCase) and database (snake_case) for reviews

const toDatabase = (review) => {
  return {
    destination_id: review.destinationId,
    user_name: review.userName,
    rating: review.rating,
    content: review.content,
    photos: review.photos,
    created_at: review.createdAt || new Date().toISOString()
  };
};

const fromDatabase = (review) => {
  if (!review) return null;
  
  return {
    id: review.id,
    destinationId: review.destination_id,
    userName: review.user_name,
    rating: review.rating,
    content: review.content,
    photos: review.photos,
    createdAt: review.created_at
  };
};

module.exports = { toDatabase, fromDatabase };
