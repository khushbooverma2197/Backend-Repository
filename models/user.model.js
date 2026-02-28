// User model for preferences and authentication
const supabase = require('../config/supabase');

const TABLE = 'users';

exports.getById = async (id) => {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

exports.create = async (user) => {
  const { data, error } = await supabase.from(TABLE).insert([user]).select().single();
  if (error) throw error;
  return data;
};

exports.updatePreferences = async (id, preferences) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ preferences })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

exports.getPreferences = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('preferences')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data?.preferences || {};
};
