import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import healthRouter from './routes/health';
import contestsRouter from './routes/contests';
import syncRouter from './routes/sync';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);
app.use('/api/contests', contestsRouter);
app.use('/api/sync', syncRouter);

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
