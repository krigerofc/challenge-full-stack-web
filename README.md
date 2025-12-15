# Student Management (Challenge)

This repository is an implementation of the Full-Stack Web challenge for student registration and management.

Quick overview
- Backend: Node.js + Express + Prisma + PostgreSQL
- Frontend: Vue 3 + Vite + Vuetify

Contents
- `back-end/` — API, validators, models and tests (Jest + Supertest)
- `front-end/` — Vue app
- `Docker/` — docker-compose for local Postgres (optional)
- `ARCHITECTURE.md` — detailed architecture
- `COMMENTS.md` — implementation notes and how-to

Quick start

1. Database (recommended):

```bash
cd Docker/db
docker-compose up -d
```

2. Backend

```bash
cd back-end
cp .env.example .env
# edit .env if needed
npm install
npm run dev
```

3. Frontend

```bash
cd front-end
npm install
npm run dev
```

Run tests (backend)

```bash
cd back-end
npm test
```

Seeding sample data

```bash
cd back-end
npm run seed
```

Notes
- See `ARCHITECTURE.md` for design rationale and testing details.
- See `COMMENTS.md` for a compact summary of decisions, libs and what remains to do.
