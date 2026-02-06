import { Hono } from 'hono';
import type { Todo } from '@todo/types';
import db from './db.js';

const api = new Hono();

interface TodoRow {
  id: number;
  title: string;
  completed: number;
  created_at: string;
}

function rowToTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    title: row.title,
    completed: row.completed === 1,
    createdAt: row.created_at,
  };
}

// GET /api/todos - list all
api.get('/todos', (c) => {
  const rows = db.prepare('SELECT * FROM todos ORDER BY id DESC').all() as TodoRow[];
  return c.json(rows.map(rowToTodo));
});

// POST /api/todos - create
api.post('/todos', async (c) => {
  const body = await c.req.json<{ title?: string }>();
  if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
    return c.json({ error: 'title is required' }, 400);
  }
  const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)');
  const result = stmt.run(body.title.trim());
  const row = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid) as TodoRow;
  return c.json(rowToTodo(row), 201);
});

// PATCH /api/todos/:id - update
api.patch('/todos/:id', async (c) => {
  const id = Number(c.req.param('id'));
  if (isNaN(id)) {
    return c.json({ error: 'Invalid id' }, 400);
  }

  const existing = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as TodoRow | undefined;
  if (!existing) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  const body = await c.req.json<{ title?: string; completed?: boolean }>();
  const title = body.title !== undefined ? body.title : existing.title;
  const completed = body.completed !== undefined ? (body.completed ? 1 : 0) : existing.completed;

  db.prepare('UPDATE todos SET title = ?, completed = ? WHERE id = ?').run(title, completed, id);
  const row = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as TodoRow;
  return c.json(rowToTodo(row));
});

// DELETE /api/todos/:id - delete
api.delete('/todos/:id', (c) => {
  const id = Number(c.req.param('id'));
  if (isNaN(id)) {
    return c.json({ error: 'Invalid id' }, 400);
  }

  const existing = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as TodoRow | undefined;
  if (!existing) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  return c.body(null, 204);
});

export default api;
