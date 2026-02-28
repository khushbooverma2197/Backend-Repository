-- Travel Inspiration Platform Database Schema
-- Execute this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- 1. DESTINATIONS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  interests TEXT[], -- Array: ["adventure", "culture", "relaxation", "history"]
  climate VARCHAR(50), -- tropical, temperate, cold, arid
  best_seasons TEXT[], -- Array: ["summer", "winter", "spring", "fall"]
  avg_daily_cost DECIMAL(10,2),
  avg_flight_cost DECIMAL(10,2),
  avg_accommodation_cost DECIMAL(10,2),
  avg_food_cost DECIMAL(10,2),
  avg_activities_cost DECIMAL(10,2),
  images TEXT[], -- Array of image URLs
  off_the_beaten_path BOOLEAN DEFAULT false,
  country VARCHAR(100),
  continent VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- 2. USERS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  preferences JSONB, -- Store user preferences as JSON
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- 3. REVIEWS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  tips TEXT[], -- Array of travel tips
  photos TEXT[], -- Array of photo URLs
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- 4. JOURNALS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS journals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  photos TEXT[], -- Array of photo URLs
  is_public BOOLEAN DEFAULT false,
  trip_dates VARCHAR(100),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- INDEXES for better performance
-- ===================================
CREATE INDEX idx_destinations_interests ON destinations USING GIN (interests);
CREATE INDEX idx_destinations_climate ON destinations (climate);
CREATE INDEX idx_destinations_budget ON destinations (avg_daily_cost);
CREATE INDEX idx_reviews_destination ON reviews (destination_id);
CREATE INDEX idx_reviews_user ON reviews (user_id);
CREATE INDEX idx_journals_user ON journals (user_id);
CREATE INDEX idx_journals_destination ON journals (destination_id);
CREATE INDEX idx_journals_public ON journals (is_public);

-- ===================================
-- SAMPLE DATA
-- ===================================

-- Insert sample destinations
INSERT INTO destinations (name, description, interests, climate, best_seasons, avg_daily_cost, avg_flight_cost, avg_accommodation_cost, avg_food_cost, avg_activities_cost, images, off_the_beaten_path, country, continent)
VALUES 
  (
    'Bali, Indonesia',
    'A tropical paradise with stunning beaches, ancient temples, lush rice terraces, and vibrant culture. Perfect for both relaxation and adventure.',
    ARRAY['adventure', 'relaxation', 'culture', 'beach'],
    'tropical',
    ARRAY['summer', 'spring'],
    75.00,
    500.00,
    100.00,
    50.00,
    75.00,
    ARRAY['https://images.unsplash.com/photo-1537996194471-e657df975ab4', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47'],
    false,
    'Indonesia',
    'Asia'
  ),
  (
    'Kyoto, Japan',
    'Ancient capital of Japan with thousands of temples, traditional gardens, geisha districts, and stunning seasonal changes.',
    ARRAY['culture', 'history', 'photography'],
    'temperate',
    ARRAY['spring', 'fall'],
    150.00,
    800.00,
    200.00,
    80.00,
    100.00,
    ARRAY['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', 'https://images.unsplash.com/photo-1528360983277-13d401cdc186'],
    false,
    'Japan',
    'Asia'
  ),
  (
    'Patagonia, Argentina',
    'Remote wilderness with dramatic glaciers, towering mountains, pristine lakes, and incredible hiking trails.',
    ARRAY['adventure', 'nature', 'hiking'],
    'cold',
    ARRAY['summer'],
    100.00,
    900.00,
    150.00,
    60.00,
    120.00,
    ARRAY['https://images.unsplash.com/photo-1543636168-4a3f9f9a9877', 'https://images.unsplash.com/photo-1570036703118-ea2511fa4129'],
    true,
    'Argentina',
    'South America'
  ),
  (
    'Santorini, Greece',
    'Iconic white-washed buildings with blue domes, stunning sunsets, volcanic beaches, and delicious Mediterranean cuisine.',
    ARRAY['relaxation', 'romance', 'beach', 'culture'],
    'temperate',
    ARRAY['summer', 'spring', 'fall'],
    120.00,
    600.00,
    180.00,
    70.00,
    90.00,
    ARRAY['https://images.unsplash.com/photo-1533105079780-92b9be482077', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff'],
    false,
    'Greece',
    'Europe'
  ),
  (
    'Marrakech, Morocco',
    'Vibrant souks, stunning palaces, aromatic spice markets, traditional riads, and gateway to the Sahara Desert.',
    ARRAY['culture', 'adventure', 'food', 'history'],
    'arid',
    ARRAY['spring', 'fall'],
    60.00,
    400.00,
    80.00,
    40.00,
    60.00,
    ARRAY['https://images.unsplash.com/photo-1597212618440-806262de4f6b', 'https://images.unsplash.com/photo-1539768942893-daf53e448371'],
    false,
    'Morocco',
    'Africa'
  );

-- Insert sample user
INSERT INTO users (name, email, preferences)
VALUES (
  'Chloe Anderson',
  'chloe@example.com',
  '{"interests": ["adventure", "culture", "photography"], "budget": 2000, "travelDates": null}'
);

-- Insert sample reviews
INSERT INTO reviews (destination_id, user_id, rating, title, content, tips, photos)
SELECT 
  d.id,
  (SELECT id FROM users WHERE email = 'chloe@example.com'),
  5,
  'Absolutely magical experience!',
  'Bali exceeded all my expectations. The rice terraces in Ubud are breathtaking, the beaches are pristine, and the local people are incredibly warm and welcoming.',
  ARRAY['Visit in May for best weather', 'Rent a scooter to explore', 'Try authentic nasi goreng'],
  ARRAY['https://images.unsplash.com/photo-1537996194471-e657df975ab4']
FROM destinations d WHERE d.name = 'Bali, Indonesia';

-- Insert sample journal
INSERT INTO journals (user_id, destination_id, title, content, photos, is_public, trip_dates)
SELECT 
  (SELECT id FROM users WHERE email = 'chloe@example.com'),
  d.id,
  'My Incredible Bali Adventure',
  'Day 1: Arrived in Denpasar and headed straight to Ubud. The drive through the countryside was stunning...',
  ARRAY['https://images.unsplash.com/photo-1537996194471-e657df975ab4'],
  true,
  '2026-06-01 to 2026-06-10'
FROM destinations d WHERE d.name = 'Bali, Indonesia';

-- ===================================
-- Row Level Security (RLS) - Optional
-- ===================================

-- Enable RLS
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

-- Destinations: Public read, authenticated write
CREATE POLICY "Destinations are viewable by everyone" ON destinations FOR SELECT USING (true);
CREATE POLICY "Destinations can be created by authenticated users" ON destinations FOR INSERT WITH CHECK (true);

-- Users: Users can read their own data
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (true);
CREATE POLICY "Users can create their own profile" ON users FOR INSERT WITH CHECK (true);

-- Reviews: Public read, authenticated write
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Reviews can be created by authenticated users" ON reviews FOR INSERT WITH CHECK (true);

-- Journals: Public journals viewable by all, private by owner only
CREATE POLICY "Public journals are viewable by everyone" ON journals FOR SELECT USING (is_public = true);
CREATE POLICY "Journals can be created by authenticated users" ON journals FOR INSERT WITH CHECK (true);

-- ===================================
-- COMPLETE!
-- ===================================
