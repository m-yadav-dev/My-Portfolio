/**
 * @file routes/contact.routes.js
 * @description Express router for the lead generation contact endpoint.
 *
 * Mounted at: /api/contact (registered in app.js)
 *
 * POST / → handleContactSubmission
 *
 * SPEC RATE LIMIT: max 3 requests per hour per IP address
 * (prevents form spam and Resend API cost inflation)
 */

"use strict";

const { Router } = require("express");
const rateLimit = require("express-rate-limit");
const { handleContactSubmission } = require("../controllers/contact.controller");

const router = Router();

// ---------------------------------------------------------------------------
// Rate limiter — spec: 3 requests / 1 hour / IP
// ---------------------------------------------------------------------------
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many contact requests. Please try again in an hour.",
    },
  },
  skipSuccessfulRequests: false,
});

router.post("/", contactLimiter, handleContactSubmission);

module.exports = router;
