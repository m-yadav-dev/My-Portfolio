/**
 * @file features/chat/api/chat.api.js
 * @description HTTP transport layer for the chat feature.
 *
 * Single responsibility: send a chat message to the backend and return
 * the parsed response. All HTTP details (endpoint, payload shape,
 * response envelope parsing) are encapsulated here.
 *
 * The Zustand store calls this — it never touches Axios directly.
 */

import api from "@/lib/api-client";

/**
 * Send a user message to the RAG chat endpoint.
 *
 * @param {{ message: string }} payload — the user's message
 * @returns {Promise<{ role: string, content: string }>} — assistant response
 * @throws {Error} with a user-friendly message on failure
 */
export async function sendChatMessage({ message }) {
  const res = await api.post("/chat", { message });

  if (res.data.success) {
    const { role, content } = res.data.data;
    return { role, content };
  }

  // Backend returned success: false — surface the structured error
  throw new Error(
    res.data.error?.message ?? "Unknown error from AI service."
  );
}
