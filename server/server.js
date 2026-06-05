/**
 * @file server.js
 * @description Network entry point. Calls app.listen().
 * Kept separate from app.js so the Express app can be imported by
 * integration tests (Supertest) without binding a port.
 *
 * SPEC: Backend boots on http://localhost:5000
 */

"use strict";

const app = require("./src/app");
const env = require("./src/config/env"); // validated at import — exits if invalid

const server = app.listen(env.PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${env.PORT}`);
  console.log(`   NODE_ENV : ${env.NODE_ENV}`);
  console.log(`   CORS     : ${env.CORS_ORIGIN}\n`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received — shutting down gracefully");
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  console.log("SIGINT received — shutting down gracefully");
  server.close(() => process.exit(0));
});
