const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const eventRoutes = require('./events/eventRoutes');
const minutesRoutes = require('./minutes/meetingMinutesRoutes');
const galleryRoutes = require('./gallery/galleryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pyrmont', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/minutes', minutesRoutes);
app.use('/api/gallery', galleryRoutes);
