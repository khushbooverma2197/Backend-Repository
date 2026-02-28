// Utility to convert between frontend (camelCase) and database (snake_case) for journals

const toDatabase = (journal) => {
  const dbJournal = {
    destination_id: journal.destinationId,
    user_id: journal.userId || 1,
    title: journal.title,
    content: journal.content,
    rating: parseInt(journal.rating) || 5,
    is_public: Boolean(journal.isPublic)
  };

  // Only add optional fields if they have values
  if (journal.visitDate) {
    dbJournal.visit_date = journal.visitDate;
  }
  
  if (journal.photos && journal.photos.length > 0) {
    dbJournal.photos = journal.photos;
  }
  
  if (journal.highlights && journal.highlights.length > 0) {
    dbJournal.highlights = journal.highlights;
  }

  return dbJournal;
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
    destinationName: journal.destination_name
  };
};

module.exports = { toDatabase, fromDatabase };
