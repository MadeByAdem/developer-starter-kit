import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AuthenticationError } from '../utils/errors';
import { User } from '@supabase/supabase-js';

// Middleware that protects routes — only logged-in users can access them.
// Use it on routes that need authentication:
//
//   router.get('/profile', requireAuth, asyncHandler(async (req, res) => {
//     // req.user contains the authenticated Supabase user
//     res.json({ success: true, data: req.user });
//   }));
//
// Public routes (like GET /api/products) don't need this middleware.

// Extend Express Request to include the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AuthenticationError('Missing or invalid authorization header'));
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return next(new AuthenticationError('Invalid or expired token'));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
