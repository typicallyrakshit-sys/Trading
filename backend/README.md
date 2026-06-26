# NYDC Crypto Paper Trading Championship — Backend

> Production-ready Node.js/TypeScript/Express backend for the NYDC Crypto Paper Trading Championship.
> Supports 500–1000 concurrent participants.

---

## ?? Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22+ |
| Language | TypeScript 5 |
| Framework | Express.js |
| ORM | Prisma + PostgreSQL |
| Realtime | Socket.IO |
| Validation | Zod |
| Logging | Winston + Daily Rotate |
| Security | Helmet, CORS, Rate Limiting |

---

## ?? Folder Structure

```
backend/
+-- src/
¦   +-- config/          # env, database, socket config
¦   +-- constants/       # API routes, enums, defaults
¦   +-- controllers/     # Request handlers
¦   +-- events/          # Internal event bus
¦   +-- generated/       # Prisma generated client
¦   +-- interfaces/      # TypeScript interfaces
¦   +-- jobs/            # Background job scheduler
¦   +-- middlewares/     # Express middlewares
¦   +-- repositories/    # Database access layer
¦   +-- routes/          # API route definitions
¦   +-- services/        # Business logic layer
¦   +-- socket/          # Socket.IO namespaces
¦   +-- types/           # TypeScript type aliases
¦   +-- utils/           # Helpers, formatters, error classes
¦   +-- validators/      # Zod schemas
¦   +-- app.ts           # Express app factory
¦   +-- server.ts        # Server entrypoint
+-- prisma/
¦   +-- schema.prisma    # DB schema
¦   +-- seed.ts          # DB seed script
+-- logs/              # Winston log files
+-- .env.example       # Environment variable template
+-- package.json
+-- tsconfig.json
+-- .eslintrc.json
+-- .prettierrc
```

---

## ? Quick Start

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Setup environment variables

```bash
cp .env.example .env
# Edit .env with your PostgreSQL URL and secrets
```

### 3. Generate Prisma client

```bash
npm run prisma:generate
```

### 4. Run database migrations

```bash
npm run prisma:migrate
```

### 5. Seed the database

```bash
npm run prisma:seed
```

### 6. Start development server

```bash
npm run dev
```

Server runs at: `http://localhost:5000/api/v1`

---

## ?? Environment Variables

| Variable | Description | Required |
|---|---|---|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |
| `DATABASE_URL` | PostgreSQL connection string | **Yes** |
| `JWT_SECRET` | JWT signing secret (32+ chars) | **Yes** |
| `JWT_EXPIRES_IN` | JWT expiry duration | No (default: 7d) |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Phase 3 |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | Phase 3 |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | Phase 3 |
| `REDIS_URL` | Redis connection URL | Phase 3 |
| `BINANCE_WS_URL` | Binance WebSocket URL | Phase 3 |
| `CLIENT_URL` | Frontend origin URL | No |

---

## ?? Available API Endpoints

### Health
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/health` | No | Server + DB health check |

### Users
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/users/profile` | Yes | Get authenticated user profile |
| GET | `/api/v1/users` | Yes | List all users |

### Orders
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/orders` | Yes | Place an order |
| GET | `/api/v1/orders` | Yes | Get user's orders |
| DELETE | `/api/v1/orders/:id` | Yes | Cancel an order |

### Portfolio
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/portfolio` | Yes | Get user portfolio |
| GET | `/api/v1/portfolio/summary` | Yes | Get P&L summary |

### Leaderboard
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/leaderboard` | No | Get top 10 traders |

### Competition
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/competition` | No | Get active competition |

### Admin
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/admin/stats` | Admin | Platform statistics |

---

## ?? Socket.IO Architecture

| Namespace | Purpose |
|---|---|
| `/market` | Live market price ticks (Phase 3: Binance) |
| `/orders` | Real-time order status updates |
| `/portfolio` | Live P&L portfolio updates |
| `/leaderboard` | Live leaderboard rankings |
| `/admin` | Admin stats dashboard |

---

## ??? Database Schema

```
User ? has many Position, Order
User ? has one Portfolio
User ? has one Leaderboard
Competition ? standalone model
```

---

## ?? npm Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start with hot reload (ts-node-dev) |
| `npm run build` | Compile TypeScript to dist/ |
| `npm run start` | Start compiled production server |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run DB migrations |
| `npm run prisma:seed` | Seed the database |
| `npm run prisma:studio` | Open Prisma Studio GUI |

---

## ?? Phase Roadmap

| Phase | Status | Description |
|---|---|---|
| Phase 1 | ? Done | Frontend UI (HTML/CSS/JS) |
| Phase 2 | ? Done | Backend Foundation (Express + Prisma + Socket.IO) |
| Phase 3 | ?? Planned | Firebase Auth + Binance WebSocket market data |
| Phase 4 | ?? Planned | Virtual Trading Engine + Portfolio calculation |
| Phase 5 | ?? Planned | Redis caching + BullMQ job queue |
| Phase 6 | ?? Planned | Docker + CI/CD deployment |

---

## ??? Security Features

- Helmet HTTP security headers
- CORS with origin whitelist
- Global + per-route rate limiting
- Request body size limit (10kb)
- Zod input validation on all routes
- Environment variable validation at startup
- Graceful shutdown (SIGTERM/SIGINT)
- Centralized error handling
- Winston structured logging with daily log rotation

---

> Built for NYDC 2026 — National Youth Development Conference Crypto Trading Championship
