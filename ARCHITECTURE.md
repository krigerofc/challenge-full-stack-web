# Solution Architecture

This project is a simple student management application composed of two main parts:

- back-end: Node.js + Express API using Prisma + PostgreSQL for persistence.
- front-end: Vue 3 + Vite + Vuetify UI.
High-level components

- API (back-end):
  - `index.js` - Express app entrypoint. Registers routes and global error handler. Exports `app` to allow tests to import the Express instance without starting the server.
  - `routes/studentRoutes.js` - Express router exposing CRUD endpoints under `/api/students`.
  - `controllers/studentController.js` - Controllers that validate input (Zod) and call model layer.
  - `models/studentModel.js` - Prisma-based data access layer (create, findMany, findUnique, update, delete).
  - `validators/studentValidator.js` - Zod schemas for request validation.

- Front-end:
  - `src/pages/index.vue` - Main page listing students and opening dialogs to create/edit.
  - `src/components/StudentList.vue` - Table of students.
  - `src/components/StudentForm.vue` - Form dialog for create/edit operations.
  - `src/components/ConfirmDialog.vue` - Reusable confirmation dialog.
  - `src/services/api.js` - Axios client for communicating with the API.

Running locally

- Database: PostgreSQL provided via Docker Compose under `Docker/db` (example `.env.example` provided in `back-end`).
- Back-end: `cd back-end && npm install && npm run dev` (uses `nodemon`).
- Front-end: `cd front-end && npm install && npm run dev` (Vite).

Testing

This project uses Jest for unit/integration tests on the backend and Supertest to exercise HTTP routes.

- Test organization:
  - `back-end/tests/validators.test.js` — unit tests for `Zod` validation schemas.
  - `back-end/tests/controllers.test.js` — controller tests that use `supertest` to call the Express `app`. The file mocks `models/studentModel` to avoid touching a real database and to keep tests fast and deterministic.

- How to run tests (backend):

```bash
cd back-end
npm install
npm test
```

- Notes about testing approach:
  - Unit tests mock the data layer (`studentModel`) so controllers' behavior (status codes, messages, error handling) can be asserted in isolation.
  - For integration tests that exercise Prisma and the real DB, create a separate test database (Docker) and run migrations and seed data before the test run. This is recommended for CI integration tests.
  - Tests run in-band (`--runInBand`) by default to avoid issues with database connection limits on CI runners.

Seed and local data

- A simple seed script is available at `back-end/prisma/seed.js`. Run it with:

```bash
cd back-end
npm run seed
```

CI and automation (recommended)

- Add a GitHub Actions workflow that runs `npm test` in the backend and the front-end tests (when available) on pushes and PRs. Keep test DB/seed setup in the workflow if integration tests are added.

Missing / recommended items to reach full submission quality

- `COMMENTS.md` — (present) explains architecture, decision, tradeoffs and missing items.
- `.env.example` — (present in `back-end`) to show required env vars.
- Tests:
  - Backend: basic Jest + Supertest tests included; consider adding model-level tests (Prisma) and integration tests against isolated DB.
  - Frontend: add unit tests for components (`vue-test-utils` + `vitest` or Jest) and optionally E2E tests using Cypress or Playwright for full CRUD flows.
- CI: add `.github/workflows/ci.yml` to run backend tests (and frontend tests when present). Optionally run lint and formatting checks.
- API documentation: expose an `openapi.yaml` or simple `API.md` describing endpoints, request/response shapes and error formats (helps evaluators).
- Coverage: add code coverage reporting (e.g., `--coverage` and upload to Codecov) and a badge on `README`.
- Security / production notes: document connection pooling, env management, rate-limiting and CORS policies in `ARCHITECTURE.md` or `COMMENTS.md`.

Example commands (quick reference)

```bash
# Start DB (docker-compose)
cd Docker/db && docker-compose up -d

# Back-end
cd back-end
npm install
npm run dev
# Solution Architecture

This project is a student management application composed of two main parts:

- Backend: Node.js + Express API using Prisma and PostgreSQL.
- Frontend: Vue 3 + Vite + Vuetify.

High-level components

- API (backend):
  - `index.js` — Express app entry point. The app exports the Express instance so tests can import it without starting the server.
  - `routes/studentRoutes.js` — Router exposing CRUD endpoints at `/api/students`.
  - `controllers/studentController.js` — Controllers that validate requests (Zod) and call the data layer.
  - `models/studentModel.js` — Prisma-based data access layer (create, findMany, findUnique, update, delete).
  - `validators/studentValidator.js` — Zod schemas for request validation.

- Frontend:
  - `src/pages/index.vue` — Main page with student listing and modals for create/edit.
  - `src/components/StudentList.vue` — Simple table view for students.
  - `src/components/StudentForm.vue` — Create/edit form modal.
  - `src/components/ConfirmDialog.vue` — Reusable confirmation dialog.
  - `src/services/api.js` — Axios client for API calls.

Running locally

- Database: Postgres via Docker Compose (see `Docker/db/docker-compose.yml`) or any Postgres instance. A sample `.env.example` is provided in `back-end`.
- Backend: `cd back-end && npm install && npm run dev` (uses `nodemon`).
- Frontend: `cd front-end && npm install && npm run dev` (Vite).

Testing

The backend uses Jest for unit and integration tests and Supertest for HTTP assertions.

- Test files:
  - `back-end/tests/validators.test.js` — unit tests for Zod schemas.
  - `back-end/tests/controllers.test.js` — controller tests using Supertest; `studentModel` is mocked to avoid using a real database in unit tests.

- Run backend tests:

```bash
cd back-end
npm test
```

Notes on testing strategy:
- Controller tests mock the data layer to verify HTTP status codes, error handling and responses without requiring a DB.
- For full integration tests (Prisma + Postgres), set up a test database (Docker), run migrations and seed data before executing the tests. This is recommended for CI integration tests.
- Tests run `--runInBand` by default to avoid connection limits on shared CI runners.

Seed and local data

- A basic seed script is available at `back-end/prisma/seed.js`. Run `npm run seed` from the `back-end` folder after configuring the database and running migrations.

CI and automation

- A minimal GitHub Actions workflow is included at `.github/workflows/ci.yml`. It runs backend tests and attempts a frontend build on pushes and pull requests. Expand the workflow to include coverage reporting, linting and frontend tests where needed.

Missing / recommended improvements

- Frontend: add unit tests for components (Vitest or Jest + Vue Test Utils) and consider E2E tests (Cypress / Playwright) for full CRUD flows.
- Backend: add model-level integration tests that run against a disposable test database.
- Documentation: provide an OpenAPI spec or `API.md` documenting endpoints and error formats.
- CI: include coverage upload (Codecov), run linters and run frontend tests/builds as part of the pipeline.
- Production notes: document Prisma pooling recommendations, environment variable management, rate limiting and CORS configuration.

Quick commands

```bash
# Start DB (docker-compose)
cd Docker/db && docker-compose up -d

# Backend
cd back-end
npm install
npm run dev

# Frontend
cd front-end
npm install
npm run dev

# Run backend tests
cd back-end
npm test

# Seed DB (after migrations)
cd back-end
npm run seed
```

---
