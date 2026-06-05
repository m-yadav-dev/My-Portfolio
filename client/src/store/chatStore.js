/**
 * @file store/chatStore.js
 * @description Zustand store for the RAG chatbot widget.
 *
 * SPEC RULE: "Headless AI Client" — the frontend ONLY manages local state
 * and fires HTTP requests. ALL AI, RAG, and vector logic lives on the backend.
 *
 * Message shape:
 *   { id: string, role: "user"|"assistant", content: string, timestamp: ISO }
 *
 * sendMessage — the single async action:
 *   1. Appends the user message to messages[]
 *   2. Sets isLoading = true
 *   3. POSTs { message } to POST /api/chat via axios
 *   4. Appends the assistant response to messages[]
 *   5. Sets isLoading = false (+ error on failure)
 */

import { create } from "zustand";
import api from "@/lib/api";

const makeMessage = (role, content) => ({
  id:        crypto.randomUUID(),
  role,
  content,
  timestamp: new Date().toISOString(),
});

const useChatStore = create((set, get) => ({
  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  messages:  [],      // { id, role, content, timestamp }[]
  isLoading: false,   // true while awaiting backend response
  isOpen:    false,   // controls widget panel visibility
  error:     null,    // last error string | null

  // --------------------------------------------------------------------------
  // Actions
  // --------------------------------------------------------------------------
  toggleChat: () => set((s) => ({ isOpen: !s.isOpen, error: null })),
  openChat:   () => set({ isOpen: true }),
  closeChat:  () => set({ isOpen: false }),
  clearChat:  () => set({ messages: [], isLoading: false, error: null }),

  // --------------------------------------------------------------------------
  // sendMessage — async action (the core headless client pattern)
  // --------------------------------------------------------------------------
  sendMessage: async (content) => {
    if (!content.trim() || get().isLoading) return;

    // Optimistic user message
    set((s) => ({
      messages:  [...s.messages, makeMessage("user", content)],
      isLoading: true,
      error:     null,
    }));

    try {
      const res = await api.post("/chat", { message: content.trim() });

      if (res.data.success) {
        const { role, content: reply } = res.data.data;
        set((s) => ({
          messages:  [...s.messages, makeMessage(role, reply)],
          isLoading: false,
        }));
      } else {
        throw new Error(res.data.error?.message ?? "Unknown error from AI service.");
      }
    } catch (err) {
      const errorText =
        err.response?.data?.error?.message ?? err.message ?? "Something went wrong.";
      set((s) => ({
        messages:  [...s.messages, makeMessage("assistant", `⚠️ ${errorText}`)],
        isLoading: false,
        error:     errorText,
      }));
    }
  },
}));

export default useChatStore;
