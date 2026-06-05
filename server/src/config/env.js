/**
 * @file env.js
 * @module config/env
 * @description Centralized environment variable management module.
 *
 * SPEC RULE: The backend application MUST NEVER access `process.env` directly
 * outside of this file. All environment variables are validated at startup
 * using Zod. If any required variable is missing or malformed, the process
 * will terminate immediately with a descriptive error (process.exit(1)).
 *
 * All other modules must import their env values from this file's exports.
 */

"use strict";

const { z } = require("zod");

// ---------------------------------------------------------------------------
// 1. Load .env file into process.env FIRST (before any validation)
// ---------------------------------------------------------------------------
require("dotenv").config();

// ---------------------------------------------------------------------------
// 2. Define the strict Zod validation schema for all environment variables
// ---------------------------------------------------------------------------
const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "PORT must be a valid positive integer",
    }),

  // Database
  MONGODB_URI: z
    .string({ required_error: "MONGODB_URI is required" })
    .min(1, "MONGODB_URI cannot be empty")
    .startsWith("mongodb", "MONGODB_URI must be a valid MongoDB connection string"),

  // Google Gemini AI
  GEMINI_API_KEY: z
    .string({ required_error: "GEMINI_API_KEY is required" })
    .min(1, "GEMINI_API_KEY cannot be empty"),

  // Resend Email API
  RESEND_API_KEY: z
    .string({ required_error: "RESEND_API_KEY is required" })
    .min(1, "RESEND_API_KEY cannot be empty"),

  // CORS & Client URLs
  CORS_ORIGIN: z
    .string({ required_error: "CORS_ORIGIN is required" })
    .url("CORS_ORIGIN must be a valid URL (e.g., http://localhost:5173)"),
  CLIENT_URL: z
    .string({ required_error: "CLIENT_URL is required" })
    .url("CLIENT_URL must be a valid URL (e.g., http://localhost:5173)"),
});

// ---------------------------------------------------------------------------
// 3. Parse & validate — terminate the process on any failure
// ---------------------------------------------------------------------------
const _parsedResult = envSchema.safeParse(process.env);

if (!_parsedResult.success) {
  // Format Zod validation issues into a readable list
  const formattedErrors = _parsedResult.error.errors
    .map((issue) => `  → [${issue.path.join(".")}] ${issue.message}`)
    .join("\n");

  console.error(
    "\n╔══════════════════════════════════════════════════════════════╗"
  );
  console.error(
    "║       ❌  ENVIRONMENT VARIABLE VALIDATION FAILED             ║"
  );
  console.error(
    "╚══════════════════════════════════════════════════════════════╝"
  );
  console.error("\nMissing or invalid environment variables:\n");
  console.error(formattedErrors);
  console.error(
    "\nCreate a .env file in /server using .env.example as a template.\n"
  );

  process.exit(1);
}

// ---------------------------------------------------------------------------
// 4. Freeze and export the validated, typed config object
// ---------------------------------------------------------------------------
const env = Object.freeze(_parsedResult.data);

module.exports = env;
