const MeetingMinutes = require('./meetingMinutesModel');

// Upload new file
exports.uploadMinutes = async (req, res) => {
  try {
    const { title, meetingDate } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const minutes = await MeetingMinutes.create({
      title,
      meetingDate,
      fileUrl: req.file.path,
      uploadedBy: req.user?.id || 'Unknown',
    });

    res.status(201).json(minutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List public
exports.listPublic = async (_req, res) => {
  const minutes = await MeetingMinutes.find({ status: 'published' }).sort({ meetingDate: -1 });
  res.json(minutes);
};

// Publish
exports.publishMinutes = async (req, res) => {
  const minutes = await MeetingMinutes.findByIdAndUpdate(
    req.params.id,
    { status: 'published' },
    { new: true }
  );
  if (!minutes) return res.status(404).json({ message: 'Not found' });
  res.json(minutes);
};
