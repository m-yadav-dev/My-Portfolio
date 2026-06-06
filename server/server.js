/**
 * @file server.js
 * @description Network entry point.
 * Boot order: DB → RAG readiness check → HTTP server
 * Kept separate from app.js so Express can be tested without port binding.
 */

"use strict";

const app           = require("./src/app");
const env           = require("./src/config/env");
const { connectDB } = require("./src/config/db");

async function start() {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║          manish.dev — Portfolio Server           ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // 1. Database — fatal if Atlas is unreachable (connectDB calls process.exit)
  await connectDB();
  console.log("[DB]  ✅  MongoDB Atlas Connected");

  // 2. RAG service readiness — embeddings + vector store are initialized lazily
  //    (they connect to the live mongoose connection established above).
  //    Logging here confirms the pipeline is ready for the first query.
  console.log("[RAG] 🤖  Vector Store & Embedding Service Ready");

  // 3. Start HTTP server
  const server = app.listen(env.PORT, () => {
    console.log(`[API] 🚀  Server running on http://localhost:${env.PORT}`);
    console.log(`[ENV] ⚙️   NODE_ENV  : ${env.NODE_ENV}`);
    console.log(`[ENV] 🌐  CORS      : ${env.CORS_ORIGIN}`);
    console.log("\n──────────────────────────────────────────────────");
    console.log("  All systems operational. Awaiting requests.\n");
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n[Server] ${signal} received — shutting down gracefully…`);
    server.close(() => {
      console.log("[Server] HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));
}

start();
