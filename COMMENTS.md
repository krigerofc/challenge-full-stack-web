# COMMENTS

## Arquitetura e decisões

- Backend: Node.js + Express com Prisma como ORM para PostgreSQL. Validação de entrada com Zod. Roteamento separado em controllers e modelos (models) para facilitar testes e manutenção.
- Frontend: Vue 3 + Vite + Vuetify 3. Axios para comunicação com API. Componentes organizados (`StudentForm`, `StudentList`, `ConfirmDialog`).

## Bibliotecas de terceiros usadas

- `prisma` / `@prisma/client` — ORM e cliente para PostgreSQL.
- `express` — framework HTTP.
- `zod` — validação de payloads.
- `vue` / `vite` / `vuetify` — front-end.
# COMMENTS

## Architecture and decisions

- Backend: Node.js + Express with Prisma (PostgreSQL). Input validation is implemented with Zod. The codebase separates controllers and models to make testing and maintenance easier.
- Frontend: Vue 3 + Vite + Vuetify 3. Axios is used to communicate with the API. Main UI components are `StudentForm`, `StudentList`, and `ConfirmDialog`.

## Third-party libraries

- `prisma` / `@prisma/client` — ORM and client for PostgreSQL.
- `express` — HTTP framework.
# COMMENTS

## Architecture and decisions

- Backend: Node.js + Express with Prisma (PostgreSQL). Input validation is implemented with Zod. The codebase separates controllers and models to make testing and maintenance easier.
- Frontend: Vue 3 + Vite + Vuetify 3. Axios is used to communicate with the API. Main UI components are `StudentForm`, `StudentList`, and `ConfirmDialog`.

## Third-party libraries

- `prisma` / `@prisma/client` — ORM and client for PostgreSQL.
- `express` — HTTP framework.
- `zod` — request payload validation.
- `vue` / `vite` / `vuetify` — frontend stack.
- `axios` — HTTP client on the frontend.
- `jest` + `supertest` — backend tests.

## Quick setup and run (summary)

Prerequisites: Node.js (18+ recommended), npm, and Docker (optional for local Postgres).

1. Fork this repository on GitHub and clone your fork. Example:

```bash
git clone https://github.com/<repo>
```

2. Install dependencies:

```bash
# backend
cd back-end
npm install

# frontend (in another terminal)
cd ../front-end
npm install
```

3. Run locally (ensure `back-end/.env` is configured to point to your database):

```bash
cd back-end
npm run dev

cd ../front-end
npm run dev
```

## Tests

Backend unit/integration tests use Jest and Supertest.

```bash
cd back-end
npm test
```

Notes:
- Controller tests in `back-end/tests` mock `models/studentModel` so they run without a database.
- For full integration testing with Prisma, create a test database (Docker), run migrations, and seed test data before running tests.

## Seed

A simple seed script is available at `back-end/prisma/seed.js`. Run:

```bash
cd back-end
npm run seed
```

## CI

A GitHub Actions workflow is included at `.github/workflows/ci.yml`. It runs backend tests and attempts a frontend build on push and pull requests.

## Delivered items and limitations

Delivered:
- CRUD API for `student` with validation and error handling.
- Frontend SPA with list/create/edit/delete flows and confirmation dialogs.
- Basic backend tests (validators + controller flows with mocked models).
- Seed script and `.env.example` for local setup.
- Basic GitHub Actions workflow for CI.

Limitations / recommended next steps:
- Add frontend unit tests and E2E tests (Cypress or Playwright).
- Add coverage reporting and integrate it into CI.
- Add OpenAPI or API.md to document endpoints and error formats.
- Add production hardening notes (Prisma pooling, rate-limiting, CORS policies).
- I would also add a middleware to prevent accessing other routes

## Final notes

Refer to `ARCHITECTURE.md` for a broader overview and design rationale. Use `COMMENTS.md` for quick setup and implementation notes.

---
