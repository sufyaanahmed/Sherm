// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user'); // Updated path

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // For parsing JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));
// Routes
app.use('/api', userRoutes); // Use user routes for /api

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
