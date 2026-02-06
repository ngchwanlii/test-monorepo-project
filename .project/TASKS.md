# Tasks

## Task 1: Project Setup & Shared Packages
- **Status**: pending
- **Owner**: backend-engineer
- **Branch**: feat/setup-and-backend
- **Description**: Set up pnpm workspace, root config, shared types package, shared api-client package, and build the backend REST API with Hono + SQLite
- **Deliverables**:
  - Root package.json with workspace scripts
  - pnpm-workspace.yaml
  - Root tsconfig.json
  - packages/types with Todo interface and API types
  - packages/api-client with fetch-based client
  - apps/backend with Hono + SQLite CRUD API
  - All packages compile with TypeScript

## Task 2: Web Frontend (TanStack Start)
- **Status**: pending (blocked by Task 1)
- **Owner**: frontend-engineer
- **Branch**: feat/web-frontend
- **Description**: Build TanStack Start web app with todo CRUD UI using the shared api-client
- **Deliverables**:
  - apps/web with TanStack Start setup
  - Todo list page with create, toggle complete, delete
  - Uses @todo/api-client for API calls

## Task 3: Mobile Frontend (Expo)
- **Status**: pending (blocked by Task 1)
- **Owner**: mobile-engineer
- **Branch**: feat/mobile-frontend
- **Description**: Build Expo React Native app with todo CRUD UI using the shared api-client
- **Deliverables**:
  - apps/mobile with Expo + Expo Router setup
  - Todo list screen with create, toggle complete, delete
  - Uses @todo/api-client for API calls
