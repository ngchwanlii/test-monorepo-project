# Todo App Monorepo - Product Requirements Document

## Overview
A simple Todo application built as a monorepo with web and mobile frontends sharing a common backend API.

## Goals
- Demonstrate monorepo architecture with pnpm workspaces
- Share code between web and mobile clients via shared packages
- Simple, functional Todo CRUD operations

## Features
### Todo CRUD
- **Create**: Add a new todo with a title
- **Read**: List all todos
- **Update**: Toggle todo completion status
- **Delete**: Remove a todo

### Non-Goals
- No authentication/authorization
- No user management
- No real-time updates
- No complex filtering/sorting

## Technical Constraints
- Monorepo managed with pnpm workspaces
- Web frontend: TanStack Start (React)
- Mobile frontend: Expo (React Native)
- Backend: Hono REST API with SQLite (better-sqlite3)
- Shared packages: TypeScript types and API client

## API Specification
### Endpoints
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create a todo `{ title: string }`
- `PATCH /api/todos/:id` - Update a todo `{ completed?: boolean, title?: string }`
- `DELETE /api/todos/:id` - Delete a todo

### Todo Shape
```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}
```
