const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    startDate: { type: Date, required: true },
    endDate: Date,
    imageUrl: String,
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    createdBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
