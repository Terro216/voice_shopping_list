import db from '../db/index.js';

export const getItems = (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'username is required' });

  const stmt = db.prepare('SELECT * FROM items WHERE username = ?');
  const items = stmt.all(username);
  res.json(items);
};

export const addItem = (req, res) => {
  const { id, name, count, username } = req.body;
  if (!id || !name || !username) return res.status(400).json({ error: 'missing fields' });

  const stmt = db.prepare('INSERT INTO items (id, name, count, username) VALUES (?, ?, ?, ?)');
  stmt.run(id, name, count || 1, username);
  
  req.app.get('io').to(`list_${username}`).emit('list_updated');
  res.json({ success: true });
};

export const incrementItem = (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username is required' });

  const stmt = db.prepare('UPDATE items SET count = count + 1 WHERE id = ? AND username = ?');
  const result = stmt.run(id, username);
  
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Item not found or unauthorized' });
  }

  req.app.get('io').to(`list_${username}`).emit('list_updated');
  res.json({ success: true });
};

export const decrementItem = (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username is required' });

  const checkStmt = db.prepare('SELECT count FROM items WHERE id = ? AND username = ?');
  const item = checkStmt.get(id, username);

  if (!item) return res.status(404).json({ error: 'Item not found' });

  if (item.count > 1) {
    const stmt = db.prepare('UPDATE items SET count = count - 1 WHERE id = ? AND username = ?');
    stmt.run(id, username);
  } else {
    const stmt = db.prepare('DELETE FROM items WHERE id = ? AND username = ?');
    stmt.run(id, username);
  }

  req.app.get('io').to(`list_${username}`).emit('list_updated');
  res.json({ success: true });
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  const { username } = req.query;

  if (!username) return res.status(400).json({ error: 'username is required' });

  const stmt = db.prepare('DELETE FROM items WHERE id = ? AND username = ?');
  stmt.run(id, username);

  req.app.get('io').to(`list_${username}`).emit('list_updated');
  res.json({ success: true });
};
