const { supabase } = require('../config/supabase');
const { AuthenticationError } = require('../utils/errors');

// Middleware that protects routes — only logged-in users can access them.
// Use it on routes that need authentication:
//
//   router.get('/profile', requireAuth, asyncHandler(async (req, res) => {
//     // req.user contains the authenticated Supabase user
//     res.json({ success: true, data: req.user });
//   }));
//
// Public routes (like GET /api/products) don't need this middleware.
const requireAuth = async (req, res, next) => {
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

module.exports = { requireAuth };
