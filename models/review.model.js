// Review model for traveler insights
const supabase = require('../config/supabase');
const { toDatabase, fromDatabase } = require('../utils/formatReview');

const TABLE = 'reviews';

exports.getAll = async () => {
  const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(fromDatabase);
};

exports.getByDestinationId = async (destinationId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('destination_id', destinationId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(fromDatabase);
};

exports.create = async (review) => {
  const dbReview = toDatabase(review);
  console.log('Inserting review into database:', dbReview);
  const { data, error } = await supabase.from(TABLE).insert([dbReview]).select().single();
  if (error) {
    console.error('Database error creating review:', error);
    throw error;
  }
  return fromDatabase(data);
};

exports.update = async (id, updates) => {
  const dbUpdates = toDatabase(updates);
  const { data, error } = await supabase
    .from(TABLE)
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return fromDatabase(data);
};

exports.delete = async (id) => {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return data;
};
