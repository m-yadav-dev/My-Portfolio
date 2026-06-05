const rateLimit = require("express-rate-limit");

// ---------------------------------------------------------------------------
// Rate limiter — spec: 3 requests / 1 hour / IP
// ---------------------------------------------------------------------------
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many contact requests. Please try again in an hour.",
    },
  },
  // Skip successful requests from the count — only failed attempts count
  skipSuccessfulRequests: false,
});

module.exports = contactLimiter;
