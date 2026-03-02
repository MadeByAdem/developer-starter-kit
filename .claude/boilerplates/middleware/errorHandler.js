const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  if (statusCode >= 500) {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err);
  }

  const response = { success: false, error: message };
  if (err.details) response.details = err.details;
  if (process.env.NODE_ENV === 'development') response.stack = err.stack;

  res.status(statusCode).json(response);
};
module.exports = errorHandler;
