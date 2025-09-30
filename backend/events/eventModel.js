const db = require('../db');
const slugify = require('slugify');

function toSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

exports.createEvent = (payload) => {
  const slug = toSlug(payload.title);
  const stmt = db.prepare(`
    INSERT INTO events (title, slug, description, location, starts_at, ends_at, cover_image_url, status, created_by)
    VALUES (@title, @slug, @description, @location, @starts_at, @ends_at, @cover_image_url, @status, @created_by)
  `);
  const info = stmt.run({
    ...payload,
    slug,
    status: payload.status || 'pending_review',
  });
  return { id: info.lastInsertRowid, slug };
};

exports.updateEvent = (id, payload) => {
  const fields = [];
  const params = { id };
  for (const [k, v] of Object.entries(payload)) {
    if (k === 'title') {
      fields.push(`title=@title`);
      fields.push(`slug=@slug`);
      params.title = v;
      params.slug = toSlug(v);
    } else {
      fields.push(`${k}=@${k}`);
      params[k] = v;
    }
  }
  const sql = `UPDATE events SET ${fields.join(', ')}, updated_at=datetime('now') WHERE id=@id`;
  const info = db.prepare(sql).run(params);
  return info.changes > 0;
};

exports.publishEvent = (id) => {
  const info = db.prepare(`
    UPDATE events SET status='published', updated_at=datetime('now') WHERE id=@id
  `).run({ id });
  return info.changes > 0;
};

exports.deleteEvent = (id) => {
  const info = db.prepare(`DELETE FROM events WHERE id=@id`).run({ id });
  return info.changes > 0;
};

exports.getEventById = (id, { includeUnpublished = false } = {}) => {
  const sql = includeUnpublished
    ? `SELECT * FROM events WHERE id=@id`
    : `SELECT * FROM events WHERE id=@id AND status='published'`;
  return db.prepare(sql).get({ id });
};

exports.listEventsPublic = () => {
  return db.prepare(`
    SELECT * FROM events WHERE status='published' ORDER BY datetime(starts_at) ASC
  `).all();
};

exports.listEventsAll = () => {
  return db.prepare(`SELECT * FROM events ORDER BY datetime(starts_at) DESC`).all();
};

exports.listMyEvents = (userId) => {
  return db.prepare(`
    SELECT * FROM events WHERE created_by=@userId ORDER BY datetime(starts_at) DESC
  `).all({ userId });
};
