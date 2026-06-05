/**
 * @file config/db.js
 * @description Mongoose connection factory.
 * Called once from server.js before the HTTP server starts.
 * All modules that need DB access (e.g. vector-store.js) rely on
 * mongoose.connection being established at that point.
 */

"use strict";

const mongoose = require("mongoose");
const env = require("./env");

async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: "portfolio",           // explicit DB name — never rely on URI default
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected → ${mongoose.connection.host}`);
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      layer: "CONFIG",
      module: "db.js",
      error_message: err.message,
    }));
    process.exit(1); // fatal — app cannot run without DB
  }
}

module.exports = { connectDB };
