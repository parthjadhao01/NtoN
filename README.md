# NtoN

An open-source [n8n](https://n8n.io/)-style workflow automation builder — build, connect, and run automated workflows on a visual node-based canvas.

> 🚧 Early stage / work in progress. Auth is implemented; the workflow engine, node system, and credentials management are actively being built.

## What is this?

NtoN lets users visually design workflows by dragging and connecting nodes on a canvas, then execute those workflows on a backend engine — similar in spirit to n8n, Zapier, or Make. The project is a Turborepo monorepo with a Next.js frontend (canvas built on [React Flow](https://reactflow.dev/)) and an Express/MongoDB backend.

## What's inside?

### Apps

- `apps/web` — [Next.js](https://nextjs.org/) frontend. Renders the workflow canvas using `@xyflow/react`, styled with Tailwind CSS and shadcn/ui components.
- `apps/backend` — [Express](https://expressjs.com/) API server (Bun runtime) backed by MongoDB via Mongoose. Handles auth and (in progress) workflows, credentials, node definitions, and executions.

### Packages

- `packages/db` — shared Mongoose models and DB client, consumed by the backend.
- `packages/common` — shared Zod schemas and TypeScript types used across apps.
- `packages/ui` — shared React component library used by `web`.
- `packages/eslint-config` — shared ESLint configuration.
- `packages/tailwind-config` — shared Tailwind CSS configuration.
- `packages/typescript-config` — shared `tsconfig.json` base configs.

Everything is written in TypeScript.

## Current features

- **Auth** — signup/login with hashed passwords (bcrypt), short-lived access tokens + rotating refresh tokens (JWT, stored as `httpOnly` cookies), logout, and refresh-token rotation. Rate-limited on `/auth` routes.
- **Workflow canvas (in progress)** — a first workflow-creation screen (`apps/web/app/create-workflow`) built on React Flow.
- **Workflow/credentials/nodes API (scaffolded)** — REST endpoints for workflows, executions, credentials, and node definitions exist in `apps/backend/index.ts` and are being implemented.

## Getting started

### Prerequisites

- [Bun](https://bun.com/) (this project uses Bun as its package manager and runtime — see `apps/backend/CLAUDE.md`)
- A running MongoDB instance

### Install

```sh
bun install
```

### Configure the backend

Copy the example env file and fill in the values:

```sh
cp apps/backend/.env.example apps/backend/.env
```

```
MONGO_URI=mongodb://localhost:27017/ntoN
PORT=3000
NODE_ENV=development
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

### Run

From the repo root, this starts all apps in dev mode via Turborepo:

```sh
bun run dev
```

- `apps/web` runs on [http://localhost:3001](http://localhost:3001)
- `apps/backend` runs on the `PORT` from your `.env` (default `3000`)

### Other useful commands

```sh
bun run build         # build all apps/packages
bun run lint          # lint all apps/packages
bun run check-types   # type-check all apps/packages
bun run format        # format with Prettier
```

## Tech stack

- **Frontend**: Next.js 16, React 19, React Flow (`@xyflow/react`), Tailwind CSS 4, shadcn/ui
- **Backend**: Express 5, Mongoose 9 (MongoDB), JWT auth, bcrypt, Zod
- **Tooling**: Turborepo, Bun, TypeScript, ESLint, Prettier

## Roadmap

- [ ] Workflow CRUD (create/read/update workflows)
- [ ] Node registry and node execution engine
- [ ] Workflow execution history/logs
- [ ] Credentials storage (encrypted)
- [ ] Trigger nodes (webhook, schedule, manual)
- [ ] Canvas: drag-and-drop node palette, node config panels, run/test workflow from the UI
