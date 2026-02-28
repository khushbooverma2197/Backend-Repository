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

exports.search = async (filters) => {
  let query = supabase.from(TABLE).select('*');
  
  // Apply filters based on provided criteria
  if (filters.interests) {
    query = query.contains('interests', filters.interests.split(','));
  }
  if (filters.climate) {
    query = query.eq('climate', filters.climate);
  }
  if (filters.season) {
    query = query.contains('best_seasons', [filters.season]);
  }
  if (filters.budget) {
    query = query.lte('avg_daily_cost', filters.budget);
  }
  if (filters.offTheBeatenPath) {
    query = query.eq('off_the_beaten_path', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

exports.getRecommendations = async (interests) => {
  const interestArray = interests.split(',');
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .overlaps('interests', interestArray)
    .limit(10);
  
  if (error) throw error;
  return data;
};

exports.calculateBudget = async (destinationId, duration, travelers) => {
  const { data: destination, error } = await supabase
    .from(TABLE)
    .select('name, avg_daily_cost, avg_flight_cost, avg_accommodation_cost, avg_food_cost, avg_activities_cost')
    .eq('id', destinationId)
    .single();
  
  if (error) throw error;
  
  const flightCost = (destination.avg_flight_cost || 500) * travelers;
  const accommodationCost = (destination.avg_accommodation_cost || 100) * duration;
  const foodCost = (destination.avg_food_cost || 50) * duration * travelers;
  const activitiesCost = (destination.avg_activities_cost || 75) * duration * travelers;
  
  const totalCost = flightCost + accommodationCost + foodCost + activitiesCost;
  
  return {
    destination: destination.name,
    duration: `${duration} days`,
    travelers,
    breakdown: {
      flights: flightCost,
      accommodation: accommodationCost,
      food: foodCost,
      activities: activitiesCost
    },
    total: totalCost,
    perPerson: Math.round(totalCost / travelers)
  };
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
