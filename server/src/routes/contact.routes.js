/**
 * @file routes/contact.routes.js
 * @description Express router for the lead generation contact endpoint.
 *
 * Mounted at: /api/contact (registered in app.js)
 *
 * POST / → sendContactEmail
 *
 * SPEC RATE LIMIT: max 3 requests per hour per IP address
 * (prevents form spam and Resend API cost inflation)
 */

"use strict";

const { Router } = require("express");
const contactLimiter = require("../middleware/contact-limiter.middleware");
const { sendContactEmail } = require("../controllers/contact.controller");

const router = Router();



router.post("/", contactLimiter, sendContactEmail);

module.exports = router;
