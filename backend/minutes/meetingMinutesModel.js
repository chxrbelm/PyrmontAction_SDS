const db = require('../db');

exports.createMinutes = (payload) => {
  const stmt = db.prepare(`
    INSERT INTO meeting_minutes (title, meeting_date, file_path, file_size, status, uploaded_by)
    VALUES (@title, @meeting_date, @file_path, @file_size, @status, @uploaded_by)
  `);
  const info = stmt.run(payload);
  return info.lastInsertRowid;
};

exports.publishMinutes = (id) => {
  const info = db.prepare(`
    UPDATE meeting_minutes SET status='published', updated_at=datetime('now') WHERE id=@id
  `).run({ id });
  return info.changes > 0;
};

exports.listPublic = () => {
  return db.prepare(`
    SELECT id, title, meeting_date FROM meeting_minutes
    WHERE status='published' ORDER BY meeting_date DESC
  `).all();
};

exports.getById = (id, { includePrivate = false } = {}) => {
  const sql = includePrivate
    ? `SELECT * FROM meeting_minutes WHERE id=@id`
    : `SELECT * FROM meeting_minutes WHERE id=@id AND status='published'`;
  return db.prepare(sql).get({ id });
};

exports.remove = (id) => {
  const row = db.prepare(`SELECT file_path FROM meeting_minutes WHERE id=@id`).get({ id });
  const info = db.prepare(`DELETE FROM meeting_minutes WHERE id=@id`).run({ id });
  return { removed: info.changes > 0, file_path: row?.file_path };
};
