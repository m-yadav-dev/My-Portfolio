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
 *   3. Delegates to chat.api.sendChatMessage()
 *   4. Appends the assistant response to messages[]
 *   5. Sets isLoading = false (+ error on failure)
 */

import { create } from "zustand";
import { sendChatMessage } from "@/features/chat/api/chat.api";

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
  // sendMessage — async action (delegates HTTP to chat.api.js)
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
      const { role, content: reply } = await sendChatMessage({
        message: content.trim(),
      });

      set((s) => ({
        messages:  [...s.messages, makeMessage(role, reply)],
        isLoading: false,
      }));
    } catch (err) {
      const errorText = err.message ?? "Something went wrong.";
      set((s) => ({
        messages:  [...s.messages, makeMessage("assistant", `⚠️ ${errorText}`)],
        isLoading: false,
        error:     errorText,
      }));
    }
  },
}));

export default useChatStore;

