import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Security
app.use(helmet());

// CORS — supports a single origin or multiple comma-separated origins:
//   CORS_ORIGIN=http://localhost:5173
//   CORS_ORIGIN=https://myapp.pages.dev,https://www.myapp.com
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: corsOrigin.includes(',') ? corsOrigin.split(',').map((o) => o.trim()) : corsOrigin,
  credentials: true,
}));

// Rate limiting — prevent brute force and abuse
// In development the limit is higher so you don't get blocked while building.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 1000 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later' },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// Mount domain routes here:
// app.use('/api/users', userRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
