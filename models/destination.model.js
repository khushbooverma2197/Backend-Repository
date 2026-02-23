// Destination model (Supabase)
const supabase = require('../config/supabase');

const TABLE = 'destinations';

exports.getAll = async () => {
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) throw error;
  return data;
};

exports.getById = async (id) => {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

exports.create = async (destination) => {
  const { data, error } = await supabase.from(TABLE).insert([destination]).select().single();
  if (error) throw error;
  return data;
};

exports.update = async (id, updates) => {
  const { data, error } = await supabase.from(TABLE).update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

exports.delete = async (id) => {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return data;
};
