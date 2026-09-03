/**
 * @file routes/chat.routes.js
 * @description Express router for the RAG chat endpoint.
 *
 * Mounted at: /api/chat (registered in app.js)
 *
 * POST / → handleChatMessage
 *
 * SPEC RATE LIMIT: 15 requests per 15 minutes per IP
 * (balances UX with Gemini API cost management)
 */

"use strict";

const { Router } = require("express");
const rateLimit  = require("express-rate-limit");
const { handleChatMessage } = require("../controllers/chat.controller");

const router = Router();

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    data: null,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many questions — please wait 15 minutes before sending more.",
    },
  },
});

router.post("/", chatLimiter, handleChatMessage);

module.exports = router;
