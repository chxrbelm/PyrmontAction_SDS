const mongoose = require('mongoose');

const meetingMinuteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Meeting title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    
    meetingDate: {
        type: Date,
        required: [true, 'Meeting date is required'],
    },
    
    pdfUrl: {
        type: String,
        required: [true, 'PDF URL path is required'],
        trim: true,
        validate: {
            validator: function(v) {
                // Basic URL/path validation
                return /^(https?:\/\/|\/|\.\/|\.\.\/)[^\s]+\.(pdf)$/i.test(v);
            },
            message: 'Please provide a valid PDF URL or file path'
        }
    },
    
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['draft', 'published', 'private'],
            message: 'Status must be either draft, published, or private'
        },
        default: 'draft'
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('MeetingMinute', meetingMinuteSchema);