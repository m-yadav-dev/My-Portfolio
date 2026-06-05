/**
 * @file chatStore.js
 * @module store/chatStore
 * @description Zustand store for the RAG chatbot widget local state.
 *
 * SPEC RULE: "Headless AI Client" — the frontend ONLY manages local state
 * (user/agent message arrays) and fires HTTP requests. All RAG logic is
 * entirely on the backend.
 *
 * Shape of a message object:
 * {
 *   id: string (crypto.randomUUID),
 *   role: "user" | "assistant",
 *   content: string,
 *   timestamp: ISO string,
 * }
 */

import { create } from "zustand";

const useChatStore = create((set, get) => ({
  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  messages: [],       // Array of { id, role, content, timestamp }
  isLoading: false,   // True while waiting for backend response
  isOpen: false,      // Controls chat widget visibility
  error: null,        // Last error string or null

  // --------------------------------------------------------------------------
  // Actions
  // --------------------------------------------------------------------------

  /** Toggle the chat widget open/closed */
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

  /** Open the chat widget */
  openChat: () => set({ isOpen: true }),

  /** Close the chat widget */
  closeChat: () => set({ isOpen: false }),

  /** Append a message to the conversation */
  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          role,
          content,
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  /** Set the loading state */
  setLoading: (isLoading) => set({ isLoading }),

  /** Set an error message */
  setError: (error) => set({ error }),

  /** Clear all messages and reset state */
  clearChat: () =>
    set({ messages: [], isLoading: false, error: null }),
}));

export default useChatStore;
