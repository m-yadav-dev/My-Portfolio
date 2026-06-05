/**
 * @file api.js
 * @module lib/api
 * @description Centralized Axios API client.
 *
 * SPEC RULE: "Dumb Frontend Principle" — the frontend only sends HTTP requests
 * and renders responses. All LLM/DB logic stays on the backend.
 *
 * All API calls in the app must go through this configured Axios instance,
 * never via raw fetch or ad-hoc axios imports.
 */

import axios from "axios";

/**
 * Pre-configured Axios instance pointing at the Express backend.
 * During local dev, Vite's proxy (/api → http://localhost:5000) handles routing.
 * In production, set VITE_API_URL to the deployed backend URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 15000,
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
