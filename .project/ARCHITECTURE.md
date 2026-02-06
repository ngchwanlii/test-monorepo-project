# Architecture

## Monorepo Structure
```
todo-monorepo/
├── pnpm-workspace.yaml
├── package.json                 # Root package.json with workspace config
├── packages/
│   ├── types/                   # @todo/types - Shared TypeScript types
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── index.ts         # Todo interface, API types
│   └── api-client/              # @todo/api-client - Shared API client
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           └── index.ts         # fetch-based API client for all platforms
├── apps/
│   ├── backend/                 # @todo/backend - REST API server
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts         # Express server entry point
│   │       ├── db.ts            # SQLite database setup
│   │       └── routes.ts        # Todo CRUD route handlers
│   ├── web/                     # @todo/web - TanStack Start web app
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── app.config.ts
│   │   └── app/
│   │       ├── routes/
│   │       │   └── index.tsx    # Main todo list page
│   │       ├── client.tsx
│   │       ├── router.tsx
│   │       └── ssr.tsx
│   └── mobile/                  # @todo/mobile - Expo React Native app
│       ├── package.json
│       ├── tsconfig.json
│       ├── app.json
│       └── app/
│           └── index.tsx        # Main todo list screen (Expo Router)
```

## Package Dependencies
- `@todo/types` → no internal deps (leaf package)
- `@todo/api-client` → depends on `@todo/types`
- `@todo/backend` → depends on `@todo/types`
- `@todo/web` → depends on `@todo/api-client`, `@todo/types`
- `@todo/mobile` → depends on `@todo/api-client`, `@todo/types`

## Technology Choices
- **pnpm workspaces**: Monorepo package management
- **TypeScript**: All packages use TypeScript
- **Express**: Simple HTTP server for backend
- **better-sqlite3**: Embedded SQLite for persistence
- **TanStack Start**: Full-stack React framework for web
- **Expo with Expo Router**: React Native framework for mobile
- **fetch API**: Universal HTTP client (works in browser, Node, React Native)

## API Design
- RESTful JSON API
- Backend runs on port 3001
- CORS enabled for local development
- Web app runs on port 3000
- Mobile connects to localhost:3001 (or LAN IP for device testing)
