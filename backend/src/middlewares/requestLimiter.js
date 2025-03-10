import rateLimit from 'express-rate-limit'

const requestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1555, // 15 requests per each IP
  handler: (req, res, next) => {
    next(new Error('Too many attempts, please try again later.'));
  }
});

export default requestLimiter;