import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import api from './routes.js';

const app = new Hono();

app.use('/*', cors());
app.route('/api', api);

app.get('/', (c) => {
  return c.json({ message: 'Todo API is running' });
});

const port = 3001;
console.log(`Server running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
