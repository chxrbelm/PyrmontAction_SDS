const path = require('path');
const fs = require('fs');
const mm = require('./meetingMinutesModel');

exports.uploadPrivate = (req, res) => {
  const { title, meeting_date } = req.body;
  if (!title || !meeting_date || !req.file) {
    return res.status(400).json({ message: 'title, meeting_date, and PDF file required' });
  }
  const id = mm.createMinutes({
    title,
    meeting_date,
    file_path: req.file.path,
    file_size: req.file.size,
    status: 'private',
    uploaded_by: req.user.id
  });
  res.status(201).json({ id, status: 'private' });
};

exports.publish = (req, res) => {
  const ok = mm.publishMinutes(parseInt(req.params.id,10));
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Published' });
};

exports.listPublic = (_req, res) => {
  res.json(mm.listPublic());
};

exports.downloadPublic = (req, res) => {
  const row = mm.getById(parseInt(req.params.id,10), { includePrivate: false });
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.download(path.resolve(row.file_path), path.basename(row.file_path));
};

exports.downloadPrivate = (req, res) => {
  const row = mm.getById(parseInt(req.params.id,10), { includePrivate: true });
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.download(path.resolve(row.file_path), path.basename(row.file_path));
};

exports.remove = (req, res) => {
  const { removed, file_path } = mm.remove(parseInt(req.params.id,10));
  if (!removed) return res.status(404).json({ message: 'Not found' });
  fs.unlink(file_path, () => {});
  res.json({ message: 'Deleted' });
};
