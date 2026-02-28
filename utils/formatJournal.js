// Utility to convert between frontend (camelCase) and database (snake_case) for journals

const toDatabase = (journal) => {
  return {
    destination_id: journal.destinationId,
    user_id: journal.userId || 1, // Default user ID if not provided
    title: journal.title,
    content: journal.content,
    visit_date: journal.visitDate,
    rating: journal.rating,
    photos: journal.photos,
    highlights: journal.highlights,
    is_public: journal.isPublic,
    created_at: journal.createdAt || new Date().toISOString()
  };
};

const fromDatabase = (journal) => {
  if (!journal) return null;
  
  return {
    id: journal.id,
    destinationId: journal.destination_id,
    userId: journal.user_id,
    title: journal.title,
    content: journal.content,
    visitDate: journal.visit_date,
    rating: journal.rating,
    photos: journal.photos,
    highlights: journal.highlights,
    isPublic: journal.is_public,
    createdAt: journal.created_at,
    destinationName: journal.destination_name // In case it's joined
  };
};

module.exports = { toDatabase, fromDatabase };
