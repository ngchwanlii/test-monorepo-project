# Implementation Plan

## Phase 1: Project Setup & Shared Packages
**Owner: backend-engineer**

### Tasks:
1. Set up root package.json and pnpm-workspace.yaml
2. Create `packages/types` with Todo interface and API types
3. Create `packages/api-client` with fetch-based API client
4. Ensure packages build correctly with TypeScript

## Phase 2: Backend API
**Owner: backend-engineer**

### Tasks:
1. Create Hono server with CORS middleware
2. Set up SQLite database with better-sqlite3
3. Implement CRUD routes (GET, POST, PATCH, DELETE /api/todos)
4. Verify API works with curl/test

## Phase 3: Web Frontend
**Owner: frontend-engineer**

### Tasks:
1. Set up TanStack Start project in apps/web
2. Build todo list UI with create, toggle, delete
3. Connect to backend via @todo/api-client
4. Verify web app works end-to-end

## Phase 4: Mobile Frontend
**Owner: mobile-engineer**

### Tasks:
1. Set up Expo project with Expo Router in apps/mobile
2. Build todo list UI with create, toggle, delete
3. Connect to backend via @todo/api-client
4. Verify mobile app works

## Execution Strategy
- Backend engineer handles Phase 1 + 2 (setup + shared packages + API)
- Frontend engineer handles Phase 3 (web) after Phase 1 completes
- Mobile engineer handles Phase 4 (mobile) after Phase 1 completes
- Phases 3 and 4 can run in parallel once Phase 1+2 is done
