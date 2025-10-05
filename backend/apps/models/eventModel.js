const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: [true, 'Event name is required'], trim: true, maxlength: [150, 'Event name cannot exceed 150 characters'] },
    location: { type: String, required: [true, 'Location is required'], trim: true, maxlength: [200, 'Location cannot exceed 200 characters'] },
    startTime: { type: Date, required: [true, 'Event date and time is required'] },
    endTime: { type: Date, validate: { validator: v => !v || v > this.startTime, message: 'End time must be after start time' } },
    description: { type: String, required: [true, 'Description is required'], trim: true, maxlength: [2000, 'Description cannot exceed 2000 characters'] },
    imageUrl: { type: String, trim: true, validate: { validator: v => !v || /^(https?:\/\/|\/|\.\/|\.\.\/)[^\s]+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(v), message: 'Please provide a valid image URL (jpg, jpeg, png, gif, webp, svg)' } },
    status: { type: String, enum: ['draft', 'upcoming', 'cancelled', 'completed'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);