# Agentic Competitive Programming Contest Alarm - Backend

This is the Node.js backend for the Codeforces Contest Alarm system.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Push the Prisma schema to the database:
   ```bash
   npx prisma db push
   # OR generate and run a migration:
   # npx prisma migrate dev --name init
   ```

## Running the Backend

### Development
Run the server with hot-reloading:
```bash
npm run dev
```

### Production
Build and run the server:
```bash
npm run build
npm start
```

## Health Check

To verify the backend is running correctly, you can hit the health-check endpoint:

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-09-23T00:00:00.000Z",
  "service": "contest-alarm-backend"
}
```
