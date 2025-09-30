const events = require('./eventModel');

exports.create = (req, res) => {
  const { title, description, location, starts_at, ends_at, cover_image_url } = req.body;
  if (!title || !starts_at) return res.status(400).json({ message: 'title and starts_at required' });

  const status = req.user.role === 'Admin' ? 'published' : 'pending_review';
  const result = events.createEvent({
    title, description, location, starts_at, ends_at, cover_image_url,
    status, created_by: req.user.id
  });
  res.status(201).json({ id: result.id, slug: result.slug, status });
};

exports.update = (req, res) => {
  const ok = events.updateEvent(parseInt(req.params.id,10), req.body);
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Updated' });
};

exports.publish = (req, res) => {
  const ok = events.publishEvent(parseInt(req.params.id,10));
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Published' });
};

exports.remove = (req, res) => {
  const ok = events.deleteEvent(parseInt(req.params.id,10));
  if (!ok) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};

exports.getPublic = (_req, res) => {
  res.json(events.listEventsPublic());
};

exports.getOnePublic = (req, res) => {
  const ev = events.getEventById(parseInt(req.params.id,10), { includeUnpublished: false });
  if (!ev) return res.status(404).json({ message: 'Not found' });
  res.json(ev);
};

exports.listMine = (req, res) => {
  res.json(events.listMyEvents(req.user.id));
};

exports.listAll = (_req, res) => {
  res.json(events.listEventsAll());
};
