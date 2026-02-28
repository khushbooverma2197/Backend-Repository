// Travel Journal model
const supabase = require('../config/supabase');

const TABLE = 'journals';

exports.getAll = async () => {
  const { data, error } = await supabase.from(TABLE).select('*');
  if (error) throw error;
  return data;
};

exports.getByUserId = async (userId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.getById = async (id) => {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

exports.create = async (journal) => {
  const { data, error } = await supabase.from(TABLE).insert([journal]).select().single();
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
