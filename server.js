const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

// Import and use routes
const destinationRoutes = require('./routes/destination.routes');
app.use('/api/destinations', destinationRoutes);

// Error handling middleware
const errorMiddleware = require('./middleware/error.middleware');
app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('Travel Inspiration Platform Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
