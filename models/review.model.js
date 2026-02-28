// Review model for traveler insights
const supabase = require('../config/supabase');

const TABLE = 'reviews';

exports.getAll = async () => {
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) throw error;
  return data;
};

exports.getByDestinationId = async (destinationId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('destination_id', destinationId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.create = async (review) => {
  const { data, error } = await supabase.from(TABLE).insert([review]).select().single();
  if (error) throw error;
  return data;
};

exports.update = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

exports.delete = async (id) => {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return data;
};
