const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    // Required fields (your specified attributes)
    eventName: {
        type: String,
        required: [true, 'Event name is required'],
        trim: true,
        maxlength: [150, 'Event name cannot exceed 150 characters']
    },
    
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        maxlength: [200, 'Location cannot exceed 200 characters']
    },
    
    startTime: {
        type: Date,
        required: [true, 'Event date and time is required']
    },
    
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    
    imageUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true; // Allow empty string
                // Validate image URL format
                return /^(https?:\/\/|\/|\.\/|\.\.\/)[^\s]+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(v);
            },
            message: 'Please provide a valid image URL (jpg, jpeg, png, gif, webp, svg)'
        }
    },
    
    // Optional useful fields
    endTime: {
        type: Date,
        validate: {
            validator: function(v) {
                return !v || v > this.startTime; // End time must be after start time if provided
            },
            message: 'End time must be after start time'
        }
    },
    
    status: {
        type: String,
        enum: ['draft', 'upcoming', 'cancelled', 'completed'],
        default: 'draft',
    },
    
    capacity: {
        type: Number,
        min: [1, 'Capacity must be at least 1'],
        max: [10000, 'Capacity cannot exceed 10,000']
    },
    
    
}, {
    timestamps: true, // Adds createdAt and updatedAt

});


module.exports = mongoose.model('Event', eventSchema);