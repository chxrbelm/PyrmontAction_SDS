const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const newsModel = require('./news/newsModel');
const newsRoutes = require('./news/newsRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (Mongoose)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pyrmont_sds';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Legacy SQLite compatibility shim: if you still need the sqlite db object,
// create it and keep it available under `legacyDb`, but we won't inject it by default.
let legacyDb = null;
try {
  const sqlite3 = require('sqlite3').verbose();
  legacyDb = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('SQLite error:', err.message);
    else console.log('SQLite database opened (legacy)');
  });
} catch (e) {
  // sqlite not available — fine for fully migrated apps
}

// Mount route modules under /api
app.use('/api/users', require('./user/userRoutes'));
app.use('/api/projects', require('./projects/projectRoutes'));
app.use('/api/gallery', require('./gallery/galleryRoutes'));
app.use('/api/contact', require('./contact-form/contactRoute'));

// News currently uses sqlite model; if legacyDb exists, initialize it
if (legacyDb) {
  newsModel(legacyDb);
  app.use('/api/news', newsRoutes(legacyDb));
} else {
  // If no legacy DB, mount the news route without db (you'll need to migrate news to mongoose)
  app.use('/api/news', newsRoutes);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


