import rateLimit from 'express-rate-limit'

const requestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 requests per each IP
  message: 'Too many attempts, please try again later.'
});

export default requestLimiter;