# CodeMentor

**Understand Code. Visualize Logic. Learn Better.**

CodeMentor is a learning tool for Python and JavaScript. You paste or write code, run it, and when
something's wrong, it's highlighted and explained — never rewritten for you. You fix it yourself,
then re-run it. That's the whole idea: CodeMentor points, you solve.

This README covers **Phase 1**: the project's foundation. There's a working backend, a working
frontend shell with all its pages, and a real (but not yet wired up) code editor. Running your
code, analyzing errors, and AI-assisted hints all land in later phases — see "What's not built
yet" below before you go looking for them.

## Prerequisites

- **Node.js 20 or later** (built and tested on Node 22)
- **npm** (comes with Node)

## Quick start

```bash
# From the project root
npm install

# Copy the environment templates
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Run both the frontend and backend together
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

The backend works with `backend/.env` left exactly as `.env.example` copied it — every AI-related
variable is optional and the app runs in local-only mode with no key set.

## Project structure

```
codementor/
├── backend/            Express API (TypeScript)
│   └── src/
│       ├── config/         env loading
│       ├── validation/     Zod schemas
│       ├── middleware/     rate limiting, error handling
│       ├── routes/         → controllers/ → services/
│       ├── providers/      AI provider (empty — later phase)
│       ├── cache/          AI response cache (empty — later phase)
│       └── types/
└── frontend/           React + Vite app (TypeScript)
    └── src/
        ├── pages/           the 7 routed pages
        ├── components/      Navbar, Footer, AppLayout
        ├── router/          route definitions
        ├── api/             typed client for calling the backend
        ├── monaco.ts        local Monaco editor setup
        ├── runner/          code execution (empty — later phase)
        ├── analyzer/        static analysis (empty — later phase)
        ├── diagrams/        Mermaid diagrams (empty — later phase)
        ├── quiz/            local quiz generation (empty — later phase)
        ├── storage/         localStorage helpers (empty — later phase)
        └── workers/         execution Web Workers (empty — later phase)
```

Folders marked "empty" contain only a `.gitkeep` file — they exist so the structure is in place
before the phase that fills them in.

## Available scripts

Run from the project root:

| Command | What it does |
|---|---|
| `npm run dev` | Runs frontend and backend together |
| `npm run dev:frontend` | Runs just the frontend (Vite, port 5173) |
| `npm run dev:backend` | Runs just the backend (port 5000, auto-restarts on change) |
| `npm run build` | Builds both for production |
| `npm run typecheck:backend` | Type-checks the backend without building |

Inside `frontend/` or `backend/` directly, the same `dev` / `build` scripts work, plus:
- `frontend`: `npm run preview` (preview a production build), `npm run typecheck`
- `backend`: `npm start` (run a production build), `npm run typecheck`

## Environment variables

Each workspace has its own `.env.example` with every variable it uses, and comments explaining
what each one does. The short version:

- **`backend/.env`** — server port, CORS origin, AI provider settings (all optional), and the
  fair-use limits (daily AI request cap, cooldown, cache lifetime) that'll matter once AI is wired
  up.
- **`frontend/.env`** — just `VITE_API_BASE_URL`, the backend's address. Not a secret.

The AI API key is **never** read by the frontend and never appears in any `VITE_*` variable — the
backend is the only thing that ever talks to an AI provider, and only in a later phase.

## What's built and working right now

- A real Express API with a validated health check at `/api/health`, security headers, CORS, and
  general rate limiting.
- A real React app shell: routing, navigation with a live backend-connection indicator, and all 7
  pages (Landing, Playground, Projects, Quiz History, Settings, Help, 404).
- A fully working Monaco code editor on the Playground page, self-hosted (no CDN dependency), with
  a language switcher for Python and JavaScript.

## What's not built yet

By design, this phase does **not** include:

- Running Python or JavaScript code (the Playground's Run button is intentionally disabled)
- Static analysis, error highlighting, or hints
- Diagram generation
- Quiz generation
- Any AI API call — `AI_API_KEY` can be left blank and everything above still works

These arrive in later phases, following the same local-first, AI-only-when-asked approach
described in the project's core rules.
