# Travel Inspiration Platform - Backend API

## 📖 Project Overview
Backend API for the Travel Inspiration Platform built with Node.js, Express, and Supabase. This API provides comprehensive endpoints for personalized destination recommendations, budget estimators, travel reviews, and trip planning features.

## 🛠 Tech Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database and authentication
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📂 Project Structure
```
backend/
├── controllers/         # Request handlers
│   ├── destination.controller.js
│   ├── user.controller.js
│   ├── review.controller.js
│   └── journal.controller.js
├── models/             # Database models
│   ├── destination.model.js
│   ├── user.model.js
│   ├── review.model.js
│   └── journal.model.js
├── routes/             # API routes
│   ├── destination.routes.js
│   ├── user.routes.js
│   ├── review.routes.js
│   └── journal.routes.js
├── middleware/         # Custom middleware
│   ├── auth.middleware.js
│   └── error.middleware.js
├── config/             # Configuration files
│   └── supabase.js
├── utils/              # Helper functions
│   └── formatDestination.js
├── .env                # Environment variables
├── package.json        # Dependencies
└── server.js           # Entry point
```

## 🔧 Installation Steps

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Setup
1. Clone the repository:
```bash
git clone <your-backend-repo-url>
cd Backend-Repository
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Start the development server:
```bash
npm run dev
```
Or for production:
```bash
npm start
```

The server will run on `http://localhost:5000`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### 🗺 Destinations API

#### Get All Destinations
```http
GET /api/destinations
```

#### Search Destinations (with filters)
```http
GET /api/destinations/search?interests=adventure&climate=tropical&budget=2000
```
Query Parameters:
- `interests` - Comma-separated list (e.g., "adventure,culture")
- `climate` - Climate type (tropical, temperate, cold)
- `season` - Best season (summer, winter, spring, fall)
- `budget` - Maximum daily budget (number)
- `offTheBeatenPath` - Boolean (true/false)

#### Get Personalized Recommendations
```http
POST /api/destinations/recommendations
Content-Type: application/json

{
  "interests": "adventure,culture,history"
}
```

#### Get Budget Estimate
```http
GET /api/destinations/:destinationId/budget?duration=7&travelers=2
```
Query Parameters:
- `duration` - Trip duration in days
- `travelers` - Number of travelers

Response:
```json
{
  "destination": "Bali, Indonesia",
  "duration": "7 days",
  "travelers": 2,
  "breakdown": {
    "flights": 1000,
    "accommodation": 700,
    "food": 700,
    "activities": 1050
  },
  "total": 3450,
  "perPerson": 1725
}
```

#### Get Destination by ID
```http
GET /api/destinations/:id
```

#### Create Destination (Protected)
```http
POST /api/destinations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Bali, Indonesia",
  "description": "Tropical paradise...",
  "interests": ["adventure", "relaxation", "culture"],
  "climate": "tropical",
  "best_seasons": ["summer", "spring"],
  "avg_daily_cost": 75,
  "avg_flight_cost": 500,
  "avg_accommodation_cost": 100,
  "avg_food_cost": 50,
  "avg_activities_cost": 75,
  "images": ["url1", "url2"],
  "off_the_beaten_path": false
}
```

#### Update Destination (Protected)
```http
PUT /api/destinations/:id
Authorization: Bearer <token>
```

#### Delete Destination (Protected)
```http
DELETE /api/destinations/:id
Authorization: Bearer <token>
```

### 👤 Users API

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "Chloe",
  "email": "chloe@example.com",
  "preferences": {
    "interests": ["adventure", "culture"],
    "budget": 2000
  }
}
```

#### Get User by ID
```http
GET /api/users/:userId
```

#### Get User Preferences
```http
GET /api/users/:userId/preferences
```

#### Update User Preferences
```http
PUT /api/users/:userId/preferences
Content-Type: application/json

{
  "interests": ["adventure", "relaxation"],
  "budget": 3000,
  "travelDates": "2026-06-01 to 2026-06-15"
}
```

### ⭐ Reviews API

#### Get All Reviews
```http
GET /api/reviews
```

#### Get Reviews by Destination
```http
GET /api/reviews/destination/:destinationId
```

#### Create Review
```http
POST /api/reviews
Content-Type: application/json

{
  "destination_id": "uuid",
  "user_id": "uuid",
  "rating": 5,
  "title": "Amazing experience!",
  "content": "Bali exceeded all expectations...",
  "tips": ["Visit in May", "Try local food"],
  "photos": ["url1", "url2"]
}
```

#### Update Review
```http
PUT /api/reviews/:id
```

#### Delete Review
```http
DELETE /api/reviews/:id
```

### 📔 Journals API

#### Get All Public Journals
```http
GET /api/journals
```

#### Get Journals by User
```http
GET /api/journals/user/:userId
```

#### Get Journal by ID
```http
GET /api/journals/:id
```

#### Create Journal Entry
```http
POST /api/journals
Content-Type: application/json

{
  "user_id": "uuid",
  "destination_id": "uuid",
  "title": "My Bali Adventure",
  "content": "Day-by-day diary...",
  "photos": ["url1", "url2"],
  "is_public": true,
  "trip_dates": "2026-06-01 to 2026-06-10"
}
```

#### Update Journal
```http
PUT /api/journals/:id
```

#### Delete Journal
```http
DELETE /api/journals/:id
```

## 🗄️ Database Schema

### Destinations Table
```sql
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  interests TEXT[], -- Array: ["adventure", "culture", "relaxation"]
  climate VARCHAR(50),
  best_seasons TEXT[], -- Array: ["summer", "winter"]
  avg_daily_cost DECIMAL(10,2),
  avg_flight_cost DECIMAL(10,2),
  avg_accommodation_cost DECIMAL(10,2),
  avg_food_cost DECIMAL(10,2),
  avg_activities_cost DECIMAL(10,2),
  images TEXT[], -- Array of image URLs
  off_the_beaten_path BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  preferences JSONB, -- Store user preferences as JSON
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
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
```

### Journals Table
```sql
CREATE TABLE journals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  photos TEXT[], -- Array of photo URLs
  is_public BOOLEAN DEFAULT false,
  trip_dates VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Authentication
Protected routes require an `Authorization` header:
```
Authorization: Bearer <your-token>
```

## 🚀 Deployment

### Deploying to Render
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure environment variables in Render dashboard
4. Deploy!

Render will automatically:
- Install dependencies
- Run `npm start`
- Provide a live URL

## 📝 Environment Variables
Required variables:
- `PORT` - Server port (default: 5000)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## 🧪 Testing
Test APIs using:
- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example cURL:
```bash
curl http://localhost:5000/api/destinations
```

## 📋 Features Implemented
✅ MVC Architecture  
✅ Personalized destination recommendations  
✅ Advanced search with filters (climate, season, budget, interests)  
✅ Budget estimator with detailed breakdown  
✅ Traveler reviews and insights  
✅ Travel journal feature  
✅ RESTful API design  
✅ Error handling middleware  
✅ Supabase integration  
✅ CORS enabled  

## 🔗 Links
- **Deployed Backend:** [Your Render URL]
- **Frontend Repository:** [Link to frontend repo]
- **Frontend Live:** [Link to Netlify deployment]

## 👨‍💻 Author
[Your Name]

## 📄 License
ISC
