# Used Car Pricing API

A NestJS-powered RESTful API that allows users to create reports for used cars and receive dynamic price estimates based on real-world data. Built with TypeORM, SQLite, and class-validator for input handling and data integrity.

---

## Features

- **Authentication** — Sign up, sign in, and manage sessions securely.
- **Reports** — Submit car report data (make, model, mileage, etc.).
- **Price Estimation** — Get an estimated market price based on nearby reports.
- **Testable Architecture** — Includes full E2E and unit tests.
- **Environment-Specific Config** — Uses `.env.{env}` files and runtime config loading.
- **SQLite** for simple local DB management.
- **Ready for production** — With migration support and synchronized schema off in production.

---

## Folder Structure

```
src/
├── users/             # User management (entity, controller, service)
├── reports/           # Report submission and price estimation logic
├── config/            # TypeORM and environment configurations
├── migrations/        # TypeORM migrations
├── app.module.ts      # App root module
└── main.ts            # Entry point
```

---

## Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/plinadev/used-car-pricing-api.git
cd used-car-pricing-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create `.env.development`, `.env.test`, etc. as needed:

```env
# .env.development
DB_NAME=db.sqlite
COOKIE_KEY=some-random-secret
```

---

## Running the App

### Development

```bash
npm run start:dev
```

### Production

Compile and run:

```bash
npm run build
npm run start:prod
```

---

## Testing

### E2E tests

```bash
npm run test:e2e
```

### Unit tests

```bash
npm run test
```

---

## Database & Migrations

### Generate migration

```bash
npm run typeorm migration:generate src/migrations/initial-schema
```

### Run migrations

```bash
npm run typeorm migration:run
```

---

## API Endpoints Overview

### Auth Routes

- `POST /auth/signup` – Register new user
- `POST /auth/signin` – Log in
- `GET /auth/whoami` – Get current user
- `POST /auth/signout` – Log out

### Reports Routes

- `POST /reports` – Create a report
- `GET /reports` – Get all reports
- `GET /reports/:id` – Get one report
- `GET /reports/estimate` – Get price estimate

---

## Technologies

- **[NestJS](https://nestjs.com/)** — Node.js framework
- **[TypeORM](https://typeorm.io/)** — ORM for database interaction
- **[SQLite](https://www.sqlite.org/)** — Lightweight database for local dev/testing
- **[Supertest](https://github.com/visionmedia/supertest)** — HTTP assertions for testing
- **[Jest](https://jestjs.io/)** — JavaScript testing framework
- **[class-validator](https://github.com/typestack/class-validator)** — Input validation

---


