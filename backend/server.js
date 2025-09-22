const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Role = require('./apps/user/roleModel');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (Mongoose)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pyrmont_sds';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log('Connected to the database');
        await seedRoles();
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });


// Mount route modules under /api
app.use('/api/users', require('./apps/user/userRoutes'));
app.use('/api/projects', require('./apps/projects/projectRoutes'));
app.use('/api/gallery', require('./apps/gallery/galleryRoutes'));
app.use('/api/contact', require('./apps/contact-form/contactRoutes'));
app.use('/api/authentication', require('./apps/authentication/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

// Seed initial roles if they don't exist

async function seedRoles() {
    const roles = ['admin', 'member', 'content'];

    for (const roleName of roles) {
        const existingRole = await Role.findOne({ name: roleName });
        if (!existingRole) {
            await Role.create({ name: roleName });
            console.log(`Role ${roleName} created.`);
        }
    }
}


