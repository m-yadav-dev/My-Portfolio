/**
 * @file src/app.js
 * @description Express application configuration.
 * Wires all middleware and mounts all API routes.
 * Does NOT call app.listen() — that lives in server.js (separation of concerns).
 *
 * SPEC MIDDLEWARE STACK (in order):
 *   1. helmet       — secure HTTP headers
 *   2. cors         — whitelist CLIENT_URL only
 *   3. morgan       — structured HTTP request logging
 *   4. json parser  — parse incoming JSON bodies
 *   5. API routes   — /api/contact, /api/chat  (project data is now frontend-static)
 *   6. Health check — /api/health
 *   7. 404 handler  — unmatched routes
 *   8. Global error handler — all thrown errors
 */

"use strict";

const express = require("express");
const helmet  = require("helmet");
const cors    = require("cors");
const morgan  = require("morgan");
const env     = require("./config/env"); // SPEC: never use process.env directly

const contactRoutes = require("./routes/contact.routes");
const chatRoutes    = require("./routes/chat.routes");

const app = express();

// ---------------------------------------------------------------------------
// 1. Security — Helmet (secure HTTP headers)
// ---------------------------------------------------------------------------
app.use(helmet());

// ---------------------------------------------------------------------------
// 2. CORS — allow requests ONLY from the trusted frontend origin
// ---------------------------------------------------------------------------

const allowedOrignes = [
  "https://manishworks.vercel.app/", 
  "http://localhost:3000",
  "http://localhost:5173",
  env.CORS_ORIGIN,
];

app.use(
  cors({
    origin: (origin,callback) => {
      // Allow requests with no origin (like mobile apps,curl requests, postman etc)
      if (!origin || allowedOrignes.includes(origin)) {
        callback(null,true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods:        ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:    true,
  })
);

// ---------------------------------------------------------------------------
// 3. Request logging — Morgan
// ---------------------------------------------------------------------------
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

// ---------------------------------------------------------------------------
// 4. Body parsing
// ---------------------------------------------------------------------------
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------------------------------------
// 5. API Routes  (/api/projects removed — data now served from frontend bundle)
// ---------------------------------------------------------------------------
app.use("/api/contact", contactRoutes);
app.use("/api/chat",    chatRoutes);

// ---------------------------------------------------------------------------
// 6. Health-check
// ---------------------------------------------------------------------------
app.get("/api/health", (_req, res) =>
  res.status(200).json({ success: true, data: { status: "ok" }, error: null })
);

// ---------------------------------------------------------------------------
// 7. 404 — Unmatched routes
// ---------------------------------------------------------------------------
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    error: { code: "NOT_FOUND", message: "The requested endpoint does not exist." },
  });
});

// ---------------------------------------------------------------------------
// 8. Global error handler
// ---------------------------------------------------------------------------
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(JSON.stringify({
    timestamp:     new Date().toISOString(),
    layer:         "MIDDLEWARE",
    module:        "app.js — globalErrorHandler",
    error_message: err.message,
    stack_trace:   err.stack,
  }));

  res.status(err.status ?? 500).json({
    success: false,
    data:    null,
    error: {
      code:    err.code    ?? "INTERNAL_SERVER_ERROR",
      message: err.message ?? "An unexpected error occurred.",
    },
  });
});

module.exports = app;
