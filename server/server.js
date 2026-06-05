/**
 * @file server.js
 * @description Network entry point.
 * Connects MongoDB FIRST, then starts the HTTP server.
 * Kept separate from app.js so Express can be tested without port binding.
 */

"use strict";

const app           = require("./src/app");
const env           = require("./src/config/env");
const { connectDB } = require("./src/config/db");

async function start() {
  // 1. Database connection — fatal if it fails (connectDB calls process.exit)
  await connectDB();

  // 2. Start HTTP server
  const server = app.listen(env.PORT, () => {
    console.log(`✅ Server running on http://localhost:${env.PORT}`);
    console.log(`   NODE_ENV : ${env.NODE_ENV}`);
    console.log(`   CORS     : ${env.CORS_ORIGIN}\n`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n${signal} received — shutting down gracefully`);
    server.close(() => process.exit(0));
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));
}

start();
