const mongoose = require('mongoose');

const meetingMinutesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    meetingDate: { type: Date, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: String },
    status: { type: String, enum: ['private', 'published'], default: 'private' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MeetingMinutes', meetingMinutesSchema);
