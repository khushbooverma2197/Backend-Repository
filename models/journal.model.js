// Travel Journal model
const supabase = require('../config/supabase');
const { toDatabase, fromDatabase } = require('../utils/formatJournal');

const TABLE = 'journals';

exports.getAll = async () => {
  const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(fromDatabase);
};

exports.getByUserId = async (userId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(fromDatabase);
};

exports.getById = async (id) => {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return fromDatabase(data);
};

exports.create = async (journal) => {
  const dbJournal = toDatabase(journal);
  const photoCount = dbJournal.photos ? dbJournal.photos.length : 0;
  console.log('Inserting into database (photos:', photoCount, ')');
  const { data, error } = await supabase.from(TABLE).insert([dbJournal]).select().single();
  if (error) {
    console.error('Database error:', error);
    throw error;
  }
  return fromDatabase(data);
};

exports.update = async (id, updates) => {
  const dbUpdates = toDatabase(updates);
  const photoCount = dbUpdates.photos ? dbUpdates.photos.length : 0;
  console.log('Updating database:', id, '(photos:', photoCount, ')');
  const { data, error } = await supabase
    .from(TABLE)
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error('Database error:', error);
    throw error;
  }
  return fromDatabase(data);
};

exports.delete = async (id) => {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return data;
};
