/**
 * @file api.js
 * @module lib/api
 * @description Centralized Axios API client — deployment-ready.
 *
 * SPEC RULE: "Dumb Frontend Principle" — the frontend only sends HTTP requests
 * and renders responses. All LLM/DB logic stays on the backend.
 *
 * All API calls in the app must go through this configured Axios instance,
 * never via raw fetch or ad-hoc axios imports.
 *
 * BASE URL STRATEGY:
 * ┌───────────────────────────────────────────────────────────────────┐
 * │ Environment │ VITE_API_URL                │ Resolved baseURL     │
 * ├─────────────┼─────────────────────────────┼──────────────────────┤
 * │ Local Dev   │ (empty / unset)             │ "/api" (Vite proxy)  │
 * │ Vercel Prod │ https://your-api.onrender.com/api │ full URL      │
 * └───────────────────────────────────────────────────────────────────┘
 *
 * During local dev, Vite's proxy config rewrites "/api/*" to
 * http://localhost:5000/api/*, avoiding CORS entirely.
 * In production (Vercel), the env var points directly at the Render backend.
 */

import axios from "axios";

/**
 * Resolve the API base URL from the environment.
 * - VITE_API_URL is set on Vercel → use it as-is.
 * - Otherwise, fall back to "/api" which Vite proxies during dev.
 */
const baseURL = import.meta.env.VITE_API_URL || "/api";

/**
 * Pre-configured Axios instance for all backend communication.
 */
const api = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// Response interceptor — normalise API response shape
// SPEC: every endpoint returns { success, data, error }
// ---------------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Surface structured backend error if available
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(message));
  }
);

export default api;
